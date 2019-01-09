import queryStringParser from "./query-string-parser/query-string-parser.js";
import stateTokenGenerator from "./state-token-generator/state-token-generator.js";

// A map of the error keys, that the OAuth2 authorization service can
// return, to a full description
const ERROR_MESSAGES = {
  invalid_request: "The request is missing a required parameter, includes an invalid parameter value, " +
    "includes a parameter more than once, or is otherwise malformed.",
  unauthorized_client: "The client is not authorized to request an access token using this method.",
  access_denied: "The resource owner or authorization server denied the request.",
  unsupported_response_type: "The authorization server does not support obtaining an access token using " +
    "this method.",
  invalid_scope: "The requested scope is invalid, unknown, or malformed.",
  server_error: "The authorization server encountered an unexpected condition that prevented it from " +
    "fulfilling the request.",
  temporarily_unavailable: "The authorization server is currently unable to handle the request due to a " +
    "temporary overloading or maintenance of the server."
};

// The parameters the OAuth2 authorization service will return on
// success
const AUTH_PARAMS = ["access_token", "token_type", "expires_in", "state"];

// The URI we need to redirect to for communication with the OAuth2
// authorization service
export const AUTH_PATH = `oauth2/authorize?idp_id=datapunt&response_type=token&client_id=tableau_webconnectors`;

//
// The keys of values we need to store in the session storage
//
// The OAuth2 state(token) (OAuth terminology, has nothing to do with
// our app state), which is a random string
const STATE_TOKEN_KEY = "stateToken";
// The access token returned by the OAuth2 authorization service
// containing user scopes and name
const ACCESS_TOKEN_KEY = "accessToken";

/**
 * Finishes an error from the OAuth2 authorization service.
 *
 * @param code {string} Error code as returned from the service.
 * @param description {string} Error description as returned from the
 * service.
 */
function handleError(code, description) {
  sessionStorage.removeItem(STATE_TOKEN_KEY);

  // Remove parameters from the URL, as set by the error callback from the
  // OAuth2 authorization service, to clean up the URL.
  location.assign(`${location.protocol}//${location.host}${location.pathname}`);

  throw new Error("Authorization service responded with error " +
      `${code} [${description}] (${ERROR_MESSAGES[code]})`);
}

/**
 * Handles errors in case they were returned by the OAuth2 authorization
 * service.
 */
function catchError() {
  const params = queryStringParser(location.search);
  if (params && params.error) {
    handleError(params.error, params.error_description);
  }
}

/**
 * Returns the access token from the params specified.
 *
 * Only does so in case the params form a valid callback from the OAuth2
 * authorization service.
 *
 * @param {Object.<string, string>} params The parameters returned.
 * @return {string} The access token in case the params for a valid callback,
 * null otherwise.
 */
function getAccessTokenFromParams(params) {
  if (!params) {
    return null;
  }

  const stateToken = sessionStorage.getItem(STATE_TOKEN_KEY);

  // The state param must be exactly the same as the state token we
  // have saved in the session (to prevent CSRF)
  const stateTokenValid = params.state && params.state === stateToken;

  // It is a callback when all authorization parameters are defined
  // in the params the fastest check is not to check if all
  // parameters are defined but to check that no undefined parameter
  // can be found
  const paramsValid = !AUTH_PARAMS.some((param) => params[param] === undefined);

  if (paramsValid && !stateTokenValid) {
    // This is a callback, but the state token does not equal the
    // one we have saved; report to Sentry
    throw new Error(`Authenticator encountered an invalid state token (${params.state})`);
  }

  return stateTokenValid && paramsValid ? params.access_token : null;
}

/**
 * Gets the access token and return path, and clears the session storage.
 */
function handleCallback() {
  const params = queryStringParser(location.hash); // Remove # from hash string
  const accessToken = getAccessTokenFromParams(params);
  if (accessToken) {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    sessionStorage.removeItem(STATE_TOKEN_KEY);

    // Clean up URL; remove query and hash
    // https://stackoverflow.com/questions/4508574/remove-hash-from-url
    history.replaceState("", document.title, window.location.pathname);
  }
}

/**
 * Returns the access token from session storage when available.
 *
 * @returns {string} The access token.
 */
export function getAccessToken() {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

/**
 * Redirects to the OAuth2 authorization service.
 */
export function login(auth_root, scopes) {
  // Get the URI the OAuth2 authorization service needs to use as callback
  const callback = encodeURIComponent(`${location.protocol}//${location.host}${location.pathname}`);
  // Get a random string to prevent CSRF
  const stateToken = stateTokenGenerator();
  const encodedStateToken = encodeURIComponent(stateToken);

  if (!stateToken) {
    throw new Error("crypto library is not available on the current browser");
  }

  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.setItem(STATE_TOKEN_KEY, stateToken);

  const encodedScopes = encodeURIComponent(scopes.join(" "));
  location.assign(`${auth_root}${AUTH_PATH}&scope=${encodedScopes}&state=${encodedStateToken}&redirect_uri=${callback}`);
}

export function logout() {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  location.reload();
}

/**
 * Initializes the auth service when needed. Catches any callback params and
 * errors from the OAuth2 authorization service when available.
 *
 * When no access token is available it initiates the login process which will
 * redirect the user to the OAuth2 authorization service.
 *
 */
export function initAuth() {
  catchError(); // Catch any error from the OAuth2 authorization service
  handleCallback(); // Handle a callback from the OAuth2 authorization service
}

export function isAuthenticated() {
  return Boolean(getAccessToken());
}

/**
 * Creates an instance of the native JS `Headers` class containing the
 * authorization headers needed for an API call.
 *
 * @returns {Object<string, string>} The headers needed for an API call.
 */
export function getAuthHeaders() {
  const accessToken = getAccessToken();
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}
