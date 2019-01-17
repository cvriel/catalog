import "@babel/polyfill";
import 'url-search-params-polyfill';

import scraper from './scraper/scraper.js';
import {
  tellingTotaalUurdagLengteTable,
  tellingTotaalUurdagSnelheidTable,
  tellingTotaalUurdagTable, tellingYMHLengthTable, tellingYMHSpeedTable, tellingYMHTable,
  tellusTable,
  telRichtingTable
} from "./wdpSchema";
import { PAGINATION_TYPE } from './paginationType';
import {
  getAuthHeaders,
  initAuth,
  isAuthenticated,
  login
} from "./auth";

const SCOPES = [
  "TLLS/R"
];

// const API_ROOT = "https://api.data.amsterdam.nl/tellus/";
const API_ROOT = "https://acc.api.data.amsterdam.nl/tellus/";
// const API_ROOT = "http://localhost:8000/tellus/";

let auth_root;
if (window.location.host.includes("acc") ||
  window.location.host.includes("127.0.0.1") ||
  window.location.host.includes("localhost")
) {
  auth_root = "https://acc.api.data.amsterdam.nl/";
} else {
  auth_root = "https://api.data.amsterdam.nl/";
}


const scraperMapping = {
  [telRichtingTable.id]: {
    endPoint: API_ROOT + 'tel_richting/',
    paginationType: PAGINATION_TYPE.PAGE,
    requiresAuthentication: true,
    apiToSchemaMapper: (result) => ({
      "tellus_id": result.tellus,
      "richting": result.richting,
      "naam": result.naam,
      "zijstraat": result.zijstraat
    })
  },
  [tellusTable.id]: {
    endPoint: API_ROOT + 'tellus/',
    paginationType: PAGINATION_TYPE.PAGE,
    apiToSchemaMapper: (result) => ({
      "id": result.id,
      "objnr_vor": result.objnr_vor,
      "objnr_leverancier": result.objnr_leverancier,
      "meetlocatie_id": result.meetlocatie.id,
      "meetlocatie_naam": result.meetlocatie.name,
      "latitude": result.latitude,
      "longitude": result.longitude,
      "snelheids_categorie": result.snelheids_categorie
    })
  },
  [tellingTotaalUurdagTable.id]: {
    endPoint: API_ROOT + 'telling_totaal_uur_dag/',
    paginationType: PAGINATION_TYPE.PAGE,
    requiresAuthentication: true,
    apiToSchemaMapper: (result) => ({
      "id": result.id,
      "tellus_id": result.tellus,
      "richting_id": result.richting_id,
      "dag_uur": result.dag_uur,
      "dag_type": result.dag_type,
      "aantal": result.aantal
    })
  },
  [tellingTotaalUurdagLengteTable.id]: {
    endPoint: API_ROOT + 'telling_totaal_uur_lengte_dag/',
    paginationType: PAGINATION_TYPE.PAGE,
    requiresAuthentication: true,
    apiToSchemaMapper: (result) => ({
      "id": result.id,
      "tellus_id": result.tellus,
      "richting_id": result.richting_id,
      "dag_uur": result.dag_uur,
      "dag_type": result.dag_type,
      "aantal": result.aantal,
      "lengte_interval_id": result.lengte_interval_id,
      "lengte_label": result.lengte_label,

    })
  },
  [tellingTotaalUurdagSnelheidTable.id]: {
    endPoint: API_ROOT + 'telling_totaal_uur_snelheid_dag/',
    paginationType: PAGINATION_TYPE.PAGE,
    requiresAuthentication: true,
    apiToSchemaMapper: (result) => ({
      "id": result.id,
      "tellus_id": result.tellus,
      "richting_id": result.richting_id,
      "dag_uur": result.dag_uur,
      "dag_type": result.dag_type,
      "aantal": result.aantal,
      "snelheids_interval_id": result.snelheids_interval_id,
      "snelheids_label": result.snelheids_label,
    })
  },
  [tellingYMHTable.id]: {
    endPoint: API_ROOT + 'telling_totaal_ymh/',
    paginationType: PAGINATION_TYPE.PAGE,
    requiresAuthentication: true,
    apiToSchemaMapper: (result) => ({
      "id": result.id,
      "tellus_id": result.tellus,
      "richting": result.richting,
      "jaar": result.year,
      "maand": result.month,
      "uur": result.hour,
      "dag_type": result.dag_type,
      "aantal": result.aantal,
    })
  },
  [tellingYMHLengthTable.id]: {
    endPoint: API_ROOT + 'telling_totaal_ymh_lengte/',
    paginationType: PAGINATION_TYPE.PAGE,
    requiresAuthentication: true,
    apiToSchemaMapper: (result) => ({
      "id": result.id,
      "tellus_id": result.tellus,
      "richting": result.richting,
      "jaar": result.year,
      "maand": result.month,
      "uur": result.hour,
      "dag_type": result.dag_type,
      "aantal": result.aantal,
      "lengte_interval_id": result.lengte_interval_id,
      "lengte_label": result.lengte_label,
    })
  },
  [tellingYMHSpeedTable.id]: {
    endPoint: API_ROOT + 'telling_totaal_ymh_snelheid/',
    paginationType: PAGINATION_TYPE.PAGE,
    requiresAuthentication: true,
    apiToSchemaMapper: (result) => ({
      "id": result.id,
      "tellus_id": result.tellus,
      "richting": result.richting,
      "jaar": result.year,
      "maand": result.month,
      "uur": result.hour,
      "dag_type": result.dag_type,
      "aantal": result.aantal,
      "snelheids_interval_id": result.snelheids_interval_id,
      "snelheids_label": result.snelheids_label,
    })
  }
};

const updateUIWithAuthState = hasAuth => {
  document.querySelector('body').className = hasAuth ? 'authenticated' : 'not-authenticated';
};

// Create the connector object
const tellusConnector = tableau.makeConnector();

// Define the schema
tellusConnector.getSchema = function(schemaCallback) {
  schemaCallback([
    tellusTable,
    telRichtingTable,
    tellingTotaalUurdagTable,
    tellingTotaalUurdagLengteTable,
    tellingTotaalUurdagSnelheidTable,
    tellingYMHTable,
    tellingYMHLengthTable,
    tellingYMHSpeedTable,
  ]);
};

tellusConnector.init = function(initCallback) {
  tableau.authType = tableau.authTypeEnum.custom;

  if (tableau.phase == tableau.phaseEnum.gatherDataPhase) {
    // If API that WDC is using has an endpoint that checks
    // the validity of an access token, that could be used here.
    // Then the WDC can call tableau.abortForAuth if that access token
    // is invalid.
  }

  const accessToken = getAuthHeaders().Authorization;
  const hasAuthenticated = (accessToken && accessToken.length > 0) || tableau.password.length > 0;
  updateUIWithAuthState(hasAuthenticated);

  // If we are not in the data gathering phase, we want to store the token
  // This allows us to access the token in the data gathering phase
  if (tableau.phase == tableau.phaseEnum.interactivePhase || tableau.phase == tableau.phaseEnum.authPhase) {
    if (hasAuthenticated) {
      tableau.password = accessToken;

      if (tableau.phase == tableau.phaseEnum.authPhase) {
        // Auto-submit here if we are in the auth phase
        tableau.submit();
      }

      return;
    }
  }

  initCallback();
};

// Download the data
tellusConnector.getData = function(table, doneCallback) {
  const limit = parseInt(tableau.connectionData);
  scraper(table, scraperMapping, tableau.password, doneCallback, limit);
};

// Create event listeners for when the user submits the form
$(document).ready(function() {
  document.querySelector('#submitButton').addEventListener('click', () => {
    tableau.connectionName = "Tellus"; // This will be the data source name in Tableau
    const limitValue = $("input[type='radio'][name='limit']:checked").val();
    tableau.connectionData = limitValue;
    tableau.submit(); // This sends the connector object to Tableau
  });

  initAuth();

  updateUIWithAuthState(isAuthenticated());

  document.querySelector('#loginButton').addEventListener('click', () => {
    login(auth_root, SCOPES);
  });
});

tableau.registerConnector(tellusConnector);
