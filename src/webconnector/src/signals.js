import "@babel/polyfill";
import 'url-search-params-polyfill';

import { PAGINATION_TYPE } from "./paginationType";
import { initAuth, login } from "./auth";
import createConnector from "./createConnector";
import getRoots from "./apiRoot";

const SCOPES = ["SIG/ALL"];
const { apiRoot, authRoot } = getRoots();
const signalApiRoot = apiRoot + 'signals/';

const tableId = 'signals';
const schema = [
  {
    id: tableId,
    alias: "signal",
    columns: [
      {
        id: "id",
        alias: "db id number",
        dataType: tableau.dataTypeEnum.string
      }, {
        id: "signal_id",
        alias: "uid number",
        dataType: tableau.dataTypeEnum.string
      }, {
        id: "status",
        alias: "status",
        dataType: tableau.dataTypeEnum.string
      }, {
        id: "source",
        alias: "system source of signal",
        dataType: tableau.dataTypeEnum.string
      }, {
        id: "text",
        alias: "is active",
        dataType: tableau.dataTypeEnum.bool
      }, {
        id: "text_extra",
        alias: "address",
        dataType: tableau.dataTypeEnum.string
      }, {
        id: "lat",
        alias: "latitude",
        dataType: tableau.dataTypeEnum.float
      }, {
        id: "lon",
        alias: "longitude",
        dataType: tableau.dataTypeEnum.float
      }, {
        id: "buurt_code",
        alias: "buurt code",
        dataType: tableau.dataTypeEnum.string
      }, {
        id: "stadsdeel",
        alias: "stadsdeel",
        dataType: tableau.dataTypeEnum.string
      }, {
        id: "category_main",
        alias: "category main",
        dataType: tableau.dataTypeEnum.string
      }, {
        id: "category_sub",
        alias: "category sub",
        dataType: tableau.dataTypeEnum.string
      }, {
        id: "created_at",
        dataType: tableau.dataTypeEnum.date
      }, {
        id: "incident_date_start",
        dataType: tableau.dataTypeEnum.date
      }, {
        id: "incident_date_end",
        dataType: tableau.dataTypeEnum.date
      }, {
        id: "extra",
        alias: "various extra properties",
        dataType: tableau.dataTypeEnum.date
      }
    ]
  }
];

const scraperMapping = {
  [tableId]: {
    endPoint: signalApiRoot + 'auth/signal/',
    paginationType: PAGINATION_TYPE.PAGE,
    requiresAuthentication: true,
    apiToSchemaMapper: (result) => {
      const row = {
        "id": result.id,
        "signal_id": result.signal_id,
        "address": result.location.address_text,
        "stadsdeel": result.location.stadsdeel,
        "buurt_code": result.location.buurt_code,
        "lon": result.location.geometrie.coordinates[0],
        "lat": result.location.geometrie.coordinates[1],
        "status": result.status.state,
        "category_main": result.category && result.category.main,
        "category_sub": result.category && result.category.sub,
        "text": result.text,
        "text_extra": result.text_extra,
        "created_at": result.created_at,
        "incident_date_start": result.incident_date_start,
        "incident_date_end": result.incident_date_end,
        "extra_properties": result.extra_properties
      };

      if (row.incident_date_start !== null) {
        row.incident_date_start = row.incident_date_start.toString().slice(0, 10);
      }

      if (row.incident_date_end !== null) {
        row.incident_date_end = row.incident_date_end.toString().slice(0, 10);
      }

      if (row.created_at !== null) {
        row.created_at = row.created_at.toString().slice(0, 10);
      }
      return row;
    }
  }
};

const scraperOptions = {
  params: {
    page_size: 100
  }
};

const connector = createConnector(schema, scraperMapping, scraperOptions);
tableau.connectionName = "Signals"; // This will be the data source name in Tableau
tableau.registerConnector(connector);

$(document).ready(function () {
  initAuth();

  document.querySelector('#submitButton').addEventListener('click', () => {
    const limitValue = $("input[type='radio'][name='limit']:checked").val();
    tableau.connectionData = limitValue;
    tableau.submit(); // This sends the connector object to Tableau
  });

  document.querySelector('#loginButton').addEventListener('click', () => {
    login(authRoot, SCOPES);
  });
});
