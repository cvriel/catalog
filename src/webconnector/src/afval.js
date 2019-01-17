import '@babel/polyfill';
import 'url-search-params-polyfill';

import { PAGINATION_TYPE } from './scraper/paginationType';
import createConnector from './createConnector';
import getRoots from './apiRoot';

const { apiRoot } = getRoots();
const signalApiRoot = apiRoot + 'afval/v1/';

const tableId = 'container';
const schema = [
  {
    id: 'container',
    alias: 'Container Data',
    columns: [
      {
        id: 'id',
        dataType: tableau.dataTypeEnum.string
      },{
        id: 'id_number',
        alias: 'id number',
        dataType: tableau.dataTypeEnum.string
      },{
        id: 'waste_name',
        alias: 'fractie',
        dataType: tableau.dataTypeEnum.string
      },{
        id: 'buurt_code',
        alias: 'buurt_code',
        dataType: tableau.dataTypeEnum.string
      },{
        id: 'active',
        alias: 'is active',
        dataType: tableau.dataTypeEnum.bool
      },{
        id: 'address',
        alias: 'address',
        dataType: tableau.dataTypeEnum.string
      }, {
        id: 'lat',
        alias: 'latitude',
        dataType: tableau.dataTypeEnum.float
      }, {
        id: 'lon',
        alias: 'longitude',
        dataType: tableau.dataTypeEnum.float
      }, {
        id: 'volume',
        alias: 'volume m3',
        dataType: tableau.dataTypeEnum.float
      }, {
        id: 'site',
        alias: 'site',
        dataType: tableau.dataTypeEnum.string
      }, {
        id: 'placing_date',
        alias: 'placing date',
        dataType: tableau.dataTypeEnum.date
      }
    ]
  }
];

const scraperMapping = {
  [tableId]: {
    endPoint: signalApiRoot + 'containers/',
    paginationType: PAGINATION_TYPE.PAGE,
    apiToSchemaMapper: (result) => {
      const row = {
        'id': result.id,
        'id_number': result.id_number,
        'address': result.address,
        'waste_name': result.waste_name,
        'active': result.active,
        'volume': result.container_type.volume || 0,
        'placing_date': result.placing_date
      };

      if(result.well !== null) {
        row.lon = result.well.geometrie.coordinates[0];
        row.lat = result.well.geometrie.coordinates[1];
        row.buurt_code = result.well.buurt_code;
        row.site = result.well.site;
      }
      if(row.placing_date !== null) {
        row.placing_date = row.placing_date.toString().slice(0, 10);
      }
      return row;
    }
  }
};

const scraperOptions = {
  params: {
    detailed: 1,
    page_size: 1000
  }
};

const connector = createConnector(schema, scraperMapping, scraperOptions);
tableau.connectionName = 'Containers'; // This will be the data source name in Tableau
tableau.registerConnector(connector);

$(document).ready(function () {
  document.querySelector('#submitButton').addEventListener('click', () => {
    const limitValue = $('input[type=\'radio\'][name=\'limit\']:checked').val();
    tableau.connectionData = limitValue;
    tableau.submit(); // This sends the connector object to Tableau
  });
});
