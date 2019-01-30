import '@babel/polyfill';
import 'url-search-params-polyfill';

import tellusSchema, {
  tellingYMHLengthTable,
  tellingYMHSpeedTable,
  tellingYMHTable,
  tellusTable,
  telRichtingTable
} from './tellusSchema';
import { PAGINATION_TYPE } from './scraper/paginationType';
import { initAuth, login } from './auth';
import createConnector from './createConnector';
import getRoots from './apiRoot';

const SCOPES = ['TLLS/R'];
const { apiRoot, authRoot } = getRoots();
const tellusApiRoot = apiRoot + 'tellus/';

const scraperMapping = {
  [telRichtingTable.id]: {
    endPoint: tellusApiRoot + 'tel_richting/',
    paginationType: PAGINATION_TYPE.PAGE,
    requiresAuthentication: true,
    apiToSchemaMapper: (result) => ({
      'id': result.id,
      'tellus_id': result.tellus.id,
      'tellus_naam': result.tellus.meetlocatie.name,
      'weg_richting': result.richting,
      'naam': result.naam,
      'zijstraat': result.zijstraat
    })
  },
  [tellusTable.id]: {
    endPoint: tellusApiRoot + 'tellus/',
    paginationType: PAGINATION_TYPE.PAGE,
    requiresAuthentication: true,
    apiToSchemaMapper: (result) => ({
      'id': result.id,
      'objnr_vor': result.objnr_vor,
      'objnr_leverancier': result.objnr_leverancier,
      'meetlocatie_id': result.meetlocatie.id,
      'meetlocatie_naam': result.meetlocatie.name,
      'latitude': result.latitude,
      'longitude': result.longitude,
      'snelheids_categorie': result.snelheids_categorie
    })
  },
  [tellingYMHTable.id]: {
    endPoint: tellusApiRoot + 'telling_totaal_ymh/',
    paginationType: PAGINATION_TYPE.PAGE,
    requiresAuthentication: true,
    apiToSchemaMapper: (result) => ({
      'id': result.id,
      'tel_richting_id': result.tel_richting,
      'jaar': result.year,
      'maand': result.month,
      'uur': result.hour,
      'dag_type': result.dag_type,
      'aantal': result.aantal,
      'aantal_dagen': result.aantal_dagen,
    })
  },
  [tellingYMHLengthTable.id]: {
    endPoint: tellusApiRoot + 'telling_totaal_ymh_lengte/',
    paginationType: PAGINATION_TYPE.PAGE,
    requiresAuthentication: true,
    apiToSchemaMapper: (result) => ({
      'id': result.id,
      'tel_richting_id': result.tel_richting,
      'jaar': result.year,
      'maand': result.month,
      'uur': result.hour,
      'dag_type': result.dag_type,
      'aantal': result.aantal,
      'aantal_dagen': result.aantal_dagen,
      'lengte_interval_id': result.lengte_interval_id,
      'lengte_label': result.lengte_label,
    })
  },
  [tellingYMHSpeedTable.id]: {
    endPoint: tellusApiRoot + 'telling_totaal_ymh_snelheid/',
    paginationType: PAGINATION_TYPE.PAGE,
    requiresAuthentication: true,
    apiToSchemaMapper: (result) => ({
      'id': result.id,
      'tel_richting_id': result.tel_richting,
      'jaar': result.year,
      'maand': result.month,
      'uur': result.hour,
      'dag_type': result.dag_type,
      'aantal': result.aantal,
      'aantal_dagen': result.aantal_dagen,
      'snelheids_interval_id': result.snelheids_interval_id,
      'snelheids_label': result.snelheids_label,
    })
  }
};

const scraperOptions = {
  parallel: 5,
  params: {
    page_size: 10000
  }
};

const connector = createConnector(tellusSchema, scraperMapping, scraperOptions);
tableau.connectionName = 'Tellus'; // This will be the data source name in Tableau
tableau.registerConnector(connector);

$(document).ready(function() {
  initAuth();

  document.querySelector('#submitButton').addEventListener('click', () => {
    const limitValue = $('input[type=\'radio\'][name=\'limit\']:checked').val();
    tableau.connectionData = limitValue;
    tableau.submit(); // This sends the connector object to Tableau
  });

  document.querySelector('#loginButton').addEventListener('click', () => {
    login(authRoot, SCOPES);
  });
});
