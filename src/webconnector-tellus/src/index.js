import "@babel/polyfill";
import { getAuthHeaders } from "./auth.js";
import scraper from './scraper.js';
import {
  tellingTotaalUurdagLengteTable,
  tellingTotaalUurdagSnelheidTable,
  tellingTotaalUurdagTable,
  tellusTable,
  telRichtingTable
} from "./wdpSchema";
import { PAGINATION_TYPE } from './paginationType';
import {initAuth, isAuthenticated, login} from "./auth";

const SCOPES = [
  "TLLS/R"
];

// const API_ROOT = "https://api.data.amsterdam.nl/tellus/";
const API_ROOT = "http://localhost:8000/tellus/";

const scraperMapping = {
  [telRichtingTable.id]: {
    endPoint: API_ROOT + 'tel_richting/',
    paginationType: PAGINATION_TYPE.PAGE,
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
    paginationType: PAGINATION_TYPE.CURSOR,
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
    paginationType: PAGINATION_TYPE.CURSOR,
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
    paginationType: PAGINATION_TYPE.CURSOR,
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
  }
};

const updateUIWithAuthState = isAuthenticated => {
  document.querySelector('body').className = isAuthenticated ? 'authenticated' : 'not-authenticated';
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
  ]);
};

tellusConnector.init = function(initCallback) {
  tableau.authType = tableau.authTypeEnum.custom;

  // If we are in the auth phase we only want to show the UI needed for auth
  if (tableau.phase == tableau.phaseEnum.authPhase) {
    // $("#getvenuesbutton").css("display", "none");
  }

  if (tableau.phase == tableau.phaseEnum.gatherDataPhase) {
    // If API that WDC is using has an endpoint that checks
    // the validity of an access token, that could be used here.
    // Then the WDC can call tableau.abortForAuth if that access token
    // is invalid.
  }

  const accessToken = getAuthHeaders().Authorization;
  const hasAuth = (accessToken && accessToken.length > 0) || tableau.password.length > 0;
  updateUIWithAuthState(hasAuth);

  initCallback();

  // If we are not in the data gathering phase, we want to store the token
  // This allows us to access the token in the data gathering phase
  if (tableau.phase == tableau.phaseEnum.interactivePhase || tableau.phase == tableau.phaseEnum.authPhase) {
    if (hasAuth) {
      tableau.password = accessToken;

      if (tableau.phase == tableau.phaseEnum.authPhase) {
        // Auto-submit here if we are in the auth phase
        tableau.submit();
      }

      return;
    }
  }
};

// Download the data
tellusConnector.getData = function(table, doneCallback) {
  scraper(table, scraperMapping, tableau.password, doneCallback);
};

// Create event listeners for when the user submits the form
$(document).ready(function() {
  $("#submitButton").click(function() {
    tableau.connectionName = "Tellus"; // This will be the data source name in Tableau
    tableau.submit(); // This sends the connector object to Tableau
  });

  initAuth();

  const hasauth = isAuthenticated();
  updateUIWithAuthState(hasauth);

  $("#loginButton").click(function() {
    login(SCOPES);
  });
});

tableau.registerConnector(tellusConnector);
