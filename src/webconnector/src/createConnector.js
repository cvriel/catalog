import { getAuthHeaders } from './auth';
import scraper from './scraper/scraper';

function updateUIWithAuthState(hasAuth) {
  document.querySelector('body').className = hasAuth ? 'authenticated' : 'not-authenticated';
}

/**
 * Constructs web connector for REST API
 * @param schema Tableau schema
 * @param mapping Mapping from tableau table id to API endpoint and end point specific options
 * @param scraperOptions Scraper global options
 * @returns {*}
 */
const createConnector = (schema, mapping, scraperOptions) => {
  const connector = tableau.makeConnector();

  connector.init = function(initCallback) {
    const authenticatedEndpoint = Object.values(mapping).filter(item => item.requiresAuthentication);

    if (authenticatedEndpoint.length > 0) {
      // Check if an endpoint requires authentication, if not, skip auth flow
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
    }

    initCallback();
  };

  connector.getSchema = function(schemaCallback) {
    schemaCallback(schema);
  };

  connector.getData = function(table, doneCallback) {
    const limit = tableau.connectionData ? parseInt(tableau.connectionData) : 0;
    const options = {
      ...scraperOptions,
      limit
    };
    scraper(table, mapping, tableau.password, options, doneCallback);
  };

  return connector;
};

export default createConnector;
