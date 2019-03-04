import '@babel/polyfill';
import 'url-search-params-polyfill';

import tellusSchema, {
  snelheidsIntervalTable,
  telRichtingTable,
  lengteIntervalTable,
  meetraaiCategorieTable,
  validatieCategorieTable,
  representatiefCategorieTable,
  tellingTable
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
      'objnr_vor': result.tellus.objnr_vor,
      'objnr_leverancier': result.tellus.objnr_leverancier,
      'meetlocatie_naam': result.tellus.meetlocatie.name,
      'latitude': result.tellus.latitude,
      'longitude': result.tellus.longitude,
      'weg_richting': result.richting,
      'naam': result.naam,
      'zijstraat': result.zijstraat
    })
  },
  [lengteIntervalTable.id]: {
    endPoint: tellusApiRoot + 'lengte_interval/',
    paginationType: PAGINATION_TYPE.PAGE,
    apiToSchemaMapper: (result) => ({
      'id': result.id,
      'label': result.label,
      'min_cm': result.min_cm,
      'max_cm': result.max_cm,
    })
  },
  [snelheidsIntervalTable.id]: {
    endPoint: tellusApiRoot + 'snelheids_interval/',
    paginationType: PAGINATION_TYPE.PAGE,
    apiToSchemaMapper: (result) => ({
      'id': result.id,
      'label': result.label,
      'min_kmph': result.min_kmph,
      'max_kmph': result.max_kmph,
    })
  },
  [meetraaiCategorieTable.id]: {
    endPoint: tellusApiRoot + 'meetraai_categorie/',
    paginationType: PAGINATION_TYPE.PAGE,
    apiToSchemaMapper: (result) => ({
      'id': result.id,
      'label': result.label,
    })
  },
  [validatieCategorieTable.id]: {
    endPoint: tellusApiRoot + 'validatie_categorie/',
    paginationType: PAGINATION_TYPE.PAGE,
    apiToSchemaMapper: (result) => ({
      'id': result.id,
      'label': result.label,
    })
  },
  [representatiefCategorieTable.id]: {
    endPoint: tellusApiRoot + 'representatief_categorie/',
    paginationType: PAGINATION_TYPE.PAGE,
    apiToSchemaMapper: (result) => ({
      'id': result.id,
      'label': result.label,
    })
  },
  [tellingTable.id]: {
    endPoint: tellusApiRoot + 'telling/',
    paginationType: PAGINATION_TYPE.PAGE,
    requiresAuthentication: true,
    apiToSchemaMapper: (result) => ({
      'tel_richting_id': result.tel_richting,
      'tijd_van': result.tijd_van,
      'tijd_tot': result.tijd_tot,
      'aantal': result.aantal,
      'lengte_interval_id': result.lengte_interval,
      'snelheids_interval_id': result.snelheids_interval,
      'meetraai_categorie_id': result.meetraai_categorie,
      'representatief_categorie_id': result.representatief_categorie,
      'validatie_categorie_id': result.validatie_categorie,
    })
  },
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
