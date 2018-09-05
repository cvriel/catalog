/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./signal.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./access-token-parser/access-token-parser.js":
/*!****************************************************!*\
  !*** ./access-token-parser/access-token-parser.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return parseAccessToken; });\nfunction decodeToken(token) {\n  try {\n    return JSON.parse(\n      window.atob(token\n        .split('.')[1]\n        .replace('-', '+')\n        .replace('_', '/')\n      ));\n  } catch (e) {\n    return {};\n  }\n}\n\nfunction parseAccessToken(token) {\n  const content = decodeToken(token);\n  return {\n    issuer: content.iss, // the URL of the authorization endpoint\n    name: content.sub, // a descriptive string for the end-user\n    issuedAt: content.iat,\n    notBefore: content.nbf,\n    expiresAt: content.exp,\n    jwtId: content.jti, // should be globally unique\n    scopes: content.scopes // list of scopes that this token provides access to\n  };\n}\n\n\n//# sourceURL=webpack:///./access-token-parser/access-token-parser.js?");

/***/ }),

/***/ "./auth.js":
/*!*****************!*\
  !*** ./auth.js ***!
  \*****************/
/*! exports provided: API_ROOT, AUTH_PATH, getAccessToken, login, logout, initAuth, getReturnPath, isAuthenticated, getScopes, getName, getAuthHeaders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"API_ROOT\", function() { return API_ROOT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AUTH_PATH\", function() { return AUTH_PATH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAccessToken\", function() { return getAccessToken; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"login\", function() { return login; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"logout\", function() { return logout; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initAuth\", function() { return initAuth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getReturnPath\", function() { return getReturnPath; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isAuthenticated\", function() { return isAuthenticated; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getScopes\", function() { return getScopes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getName\", function() { return getName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAuthHeaders\", function() { return getAuthHeaders; });\n/* harmony import */ var _query_string_parser_query_string_parser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-string-parser/query-string-parser.js */ \"./query-string-parser/query-string-parser.js\");\n/* harmony import */ var _state_token_generator_state_token_generator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state-token-generator/state-token-generator.js */ \"./state-token-generator/state-token-generator.js\");\n/* harmony import */ var _access_token_parser_access_token_parser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./access-token-parser/access-token-parser.js */ \"./access-token-parser/access-token-parser.js\");\n\n\n\n\n// A map of the error keys, that the OAuth2 authorization service can\n// return, to a full description\nconst ERROR_MESSAGES = {\n  invalid_request: \"The request is missing a required parameter, includes an invalid parameter value, \" +\n    \"includes a parameter more than once, or is otherwise malformed.\",\n  unauthorized_client: \"The client is not authorized to request an access token using this method.\",\n  access_denied: \"The resource owner or authorization server denied the request.\",\n  unsupported_response_type: \"The authorization server does not support obtaining an access token using \" +\n    \"this method.\",\n  invalid_scope: \"The requested scope is invalid, unknown, or malformed.\",\n  server_error: \"The authorization server encountered an unexpected condition that prevented it from \" +\n    \"fulfilling the request.\",\n  temporarily_unavailable: \"The authorization server is currently unable to handle the request due to a \" +\n    \"temporary overloading or maintenance of the server.\"\n};\n\n// The parameters the OAuth2 authorization service will return on\n// success\nconst AUTH_PARAMS = [\"access_token\", \"token_type\", \"expires_in\", \"state\"];\n\n// Resolved at compile time by webpack,\n// e.g.: \"export conts API_ROOT = \"production\" === \"production\" ? ... : ...;\n// see: https://webpack.js.org/plugins/environment-plugin/\n\nlet api_root = \"\";\n\nif (window.location.host.includes(\"acc\") ||\n    window.location.host.includes(\"127.0.0.1\") ||\n    window.location.host.includes(\"localhost\")\n) {\n  api_root   = \"https://acc.api.data.amsterdam.nl/\";\n} else {\n  api_root = \"https://api.data.amsterdam.nl/\";\n}\n\nconst API_ROOT = api_root;\n\n\n// All the scopes this City Daty frontend needs for communication with\n// the backend APIs\nconst scopes = [\n  // Kadaster\n  // Alle attributen van een kadastraal niet-natuurlijk subject,\n  // inclusief alle rechten op kadastrale objecten\n  \"BRK/RS\",\n  // Alle atrributen van een kadastraal subject (natuurlijk en\n  // niet-natuurlijk), inclusief alle rechten op kadastrale objecten\n  \"BRK/RSN\",\n  // Alle attributen van een kadastraal object, inclusief koopsom,\n  // koopsom_valuta_code, koopjaar, cultuurcode_onbebouwd,\n  // cultuurcode_bebouwd en zakelijke rechten van de bijbehorende\n  // kadastrale subjecten\n  \"BRK/RO\",\n\n  // Wet Kenbaarheid Beperkingen\n  \"WKPB/RBDU\", // Lezen URL Brondocument\n\n  // Monumenten\n  \"MON/RBC\", // Lezen beschrijvingen van Complexen\n  \"MON/RDM\", // Lezen details van Monumenten\n\n  // Handelsregister\n  \"HR/R\", // Leesrechten\n\n  // Grondexploitatie\n  \"GREX/R\", // Leesrechten\n\n  // Catalogus (Dcatd) admin\n  \"CAT/W\", // Schrijfrechten\n\n  // Signals\n  \"SIG/ALL\"\n];\nconst encodedScopes = encodeURIComponent(scopes.join(\" \"));\n// The URI we need to redirect to for communication with the OAuth2\n// authorization service\nconst AUTH_PATH = `oauth2/authorize?idp_id=datapunt&response_type=token&client_id=tableau_webconnectors&scope=${encodedScopes}`;\n\n// The keys of values we need to store in the session storage\n//\n// `location.pathname` string at the moment we redirect to the\n// OAuth2 authorization service, and need to get back to afterwards\nconst RETURN_PATH = \"returnPath\";\n// The OAuth2 state(token) (OAuth terminology, has nothing to do with\n// our app state), which is a random string\nconst STATE_TOKEN = \"stateToken\";\n// The access token returned by the OAuth2 authorization service\n// containing user scopes and name\nconst ACCESS_TOKEN = \"accessToken\";\n\nlet returnPath;\nlet tokenData = {};\n\n/**\n * Finishes an error from the OAuth2 authorization service.\n *\n * @param code {string} Error code as returned from the service.\n * @param description {string} Error description as returned from the\n * service.\n */\nfunction handleError(code, description) {\n  sessionStorage.removeItem(STATE_TOKEN);\n\n  // Remove parameters from the URL, as set by the error callback from the\n  // OAuth2 authorization service, to clean up the URL.\n  location.assign(`${location.protocol}//${location.host}${location.pathname}`);\n\n  throw new Error(\"Authorization service responded with error \" +\n      `${code} [${description}] (${ERROR_MESSAGES[code]})`);\n}\n\n/**\n * Handles errors in case they were returned by the OAuth2 authorization\n * service.\n */\nfunction catchError() {\n  const params = Object(_query_string_parser_query_string_parser_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(location.search);\n  if (params && params.error) {\n    handleError(params.error, params.error_description);\n  }\n}\n\n/**\n * Returns the access token from the params specified.\n *\n * Only does so in case the params form a valid callback from the OAuth2\n * authorization service.\n *\n * @param {Object.<string, string>} params The parameters returned.\n * @return {string} The access token in case the params for a valid callback,\n * null otherwise.\n */\nfunction getAccessTokenFromParams(params) {\n  if (!params) {\n    return null;\n  }\n\n  const stateToken = sessionStorage.getItem(STATE_TOKEN);\n\n  // The state param must be exactly the same as the state token we\n  // have saved in the session (to prevent CSRF)\n  const stateTokenValid = params.state && params.state === stateToken;\n\n  // It is a callback when all authorization parameters are defined\n  // in the params the fastest check is not to check if all\n  // parameters are defined but to check that no undefined parameter\n  // can be found\n  const paramsValid = !AUTH_PARAMS.some((param) => params[param] === undefined);\n\n  if (paramsValid && !stateTokenValid) {\n    // This is a callback, but the state token does not equal the\n    // one we have saved; report to Sentry\n    throw new Error(`Authenticator encountered an invalid state token (${params.state})`);\n  }\n\n  return stateTokenValid && paramsValid ? params.access_token : null;\n}\n\n/**\n * Gets the access token and return path, and clears the session storage.\n */\nfunction handleCallback() {\n  const params = Object(_query_string_parser_query_string_parser_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(location.hash); // Remove # from hash string\n  const accessToken = getAccessTokenFromParams(params);\n  if (accessToken) {\n    tokenData = Object(_access_token_parser_access_token_parser_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(accessToken);\n    sessionStorage.setItem(ACCESS_TOKEN, accessToken);\n    returnPath = sessionStorage.getItem(RETURN_PATH);\n    sessionStorage.removeItem(RETURN_PATH);\n    sessionStorage.removeItem(STATE_TOKEN);\n\n    // Clean up URL; remove query and hash\n    // https://stackoverflow.com/questions/4508574/remove-hash-from-url\n    history.replaceState(\"\", document.title, window.location.pathname);\n  }\n}\n\n/**\n * Returns the access token from session storage when available.\n *\n * @returns {string} The access token.\n */\nfunction getAccessToken() {\n  return sessionStorage.getItem(ACCESS_TOKEN);\n}\n\n/**\n * Restores the access token from session storage when available.\n */\nfunction restoreAccessToken() {\n  const accessToken = getAccessToken();\n  if (accessToken) {\n    tokenData = Object(_access_token_parser_access_token_parser_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(accessToken);\n  }\n}\n\n/**\n * Redirects to the OAuth2 authorization service.\n */\nfunction login() {\n  // Get the URI the OAuth2 authorization service needs to use as callback\n  const callback = encodeURIComponent(`${location.protocol}//${location.host}${location.pathname}`);\n  // Get a random string to prevent CSRF\n  const stateToken = Object(_state_token_generator_state_token_generator_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  const encodedStateToken = encodeURIComponent(stateToken);\n\n  if (!stateToken) {\n    throw new Error(\"crypto library is not available on the current browser\");\n  }\n\n  sessionStorage.removeItem(ACCESS_TOKEN);\n  sessionStorage.setItem(RETURN_PATH, location.hash);\n  sessionStorage.setItem(STATE_TOKEN, stateToken);\n\n  location.assign(`${API_ROOT}${AUTH_PATH}&state=${encodedStateToken}&redirect_uri=${callback}`);\n}\n\nfunction logout() {\n  sessionStorage.removeItem(ACCESS_TOKEN);\n  location.reload();\n}\n\n/**\n * Initializes the auth service when needed. Catches any callback params and\n * errors from the OAuth2 authorization service when available.\n *\n * When no access token is available it initiates the login process which will\n * redirect the user to the OAuth2 authorization service.\n *\n */\nfunction initAuth() {\n  returnPath = \"\";\n  restoreAccessToken(); // Restore acces token from session storage\n  catchError(); // Catch any error from the OAuth2 authorization service\n  handleCallback(); // Handle a callback from the OAuth2 authorization service\n}\n\n/**\n * Gets the return path that was saved before the login process was initiated.\n *\n * @returns {string} The return path where we moved away from when the login\n * process was initiated.\n */\nfunction getReturnPath() {\n  return returnPath;\n}\n\nfunction isAuthenticated() {\n  return Boolean(getAccessToken());\n}\n\nfunction getScopes() {\n  return tokenData.scopes || [];\n}\n\nfunction getName() {\n  return tokenData.name || \"\";\n}\n\n/**\n * Creates an instance of the native JS `Headers` class containing the\n * authorization headers needed for an API call.\n *\n * @returns {Object<string, string>} The headers needed for an API call.\n */\nfunction getAuthHeaders() {\n  const accessToken = getAccessToken();\n  return accessToken ? { Authorization: `Bearer ${getAccessToken()}` } : {};\n}\n\nwindow.auth = {\n  // getAuthHeaders,\n  API_ROOT,\n  getAccessToken,\n  login,\n  logout,\n  initAuth,\n  getReturnPath,\n  isAuthenticated,\n  getScopes,\n  getName\n};\n\n\n//# sourceURL=webpack:///./auth.js?");

/***/ }),

/***/ "./query-string-parser/query-string-parser.js":
/*!****************************************************!*\
  !*** ./query-string-parser/query-string-parser.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Converts a query string to an object data structure.\n *\n * The first character of the query string will be stripped (whether it\n * is `?`, `/`, or any other character) before the string is parsed.\n *\n * `decodeURIComponent` will be used to decode the keys and the values.\n *\n * @param {string} queryString The query string including leading `?`.\n * @returns {Object.<string, string>} A key-value map representation of\n * the query string, or null if `queryString` is falsy.\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (queryString) {\n  return queryString\n    ? queryString\n      .substring(1)\n      .split('&')\n      .reduce((params, query) => {\n        const keyValue = query.split('=');\n        const key = keyValue[0];\n        keyValue.shift();\n        const value = keyValue.join('=');\n        return {\n          ...params,\n          [decodeURIComponent(key)]: decodeURIComponent(value)\n        };\n      }, {})\n    : null;\n});\n\n\n//# sourceURL=webpack:///./query-string-parser/query-string-parser.js?");

/***/ }),

/***/ "./signal.js":
/*!*******************!*\
  !*** ./signal.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.js */ \"./auth.js\");\n\n\n(function() {\n\n  // Create the connector object\n  var myConnector = tableau.makeConnector();\n\n  // Define the schema\n  myConnector.getSchema = function(schemaCallback) {\n    // Schema for magnitude and place data\n    var signal_cols = [{\n      id: \"id\",\n      alias: \"db id number\",\n      dataType: tableau.dataTypeEnum.string\n    },{\n      id: \"signal_id\",\n      alias: \"uid number\",\n      dataType: tableau.dataTypeEnum.string\n    },{\n      id: \"status\",\n      alias: \"status\",\n      dataType: tableau.dataTypeEnum.string\n    },{\n      id: \"source\",\n      alias: \"system source of signal\",\n      dataType: tableau.dataTypeEnum.string\n    },{\n      id: \"text\",\n      alias: \"is active\",\n      dataType: tableau.dataTypeEnum.bool\n    },{\n      id: \"text_extra\",\n      alias: \"address\",\n      dataType: tableau.dataTypeEnum.string\n    }, {\n      id: \"lat\",\n      alias: \"latitude\",\n      dataType: tableau.dataTypeEnum.float\n    }, {\n      id: \"lon\",\n      alias: \"longitude\",\n      dataType: tableau.dataTypeEnum.float\n    }, {\n      id: \"buurt_code\",\n      alias: \"buurt code\",\n      dataType: tableau.dataTypeEnum.string\n    }, {\n      id: \"stadsdeel\",\n      alias: \"stadsdeel\",\n      dataType: tableau.dataTypeEnum.string\n    }, {\n      id: \"category main\",\n      alias: \"category main\",\n      dataType: tableau.dataTypeEnum.string\n    }, {\n      id: \"category sub\",\n      alias: \"category sub\",\n      dataType: tableau.dataTypeEnum.string\n    }, {\n      id: \"created at\",\n      dataType: tableau.dataTypeEnum.date\n    }, {\n      id: \"incident_date_start\",\n      dataType: tableau.dataTypeEnum.date\n    }, {\n      id: \"incident_date_end\",\n      dataType: tableau.dataTypeEnum.date\n    }, {\n      id: \"extra\",\n      alias: \"various extra properties\",\n      dataType: tableau.dataTypeEnum.date\n    }\n\n    ];\n\n    var signalTable = {\n      id: \"signals\",\n      alias: \"signal\",\n      columns: signal_cols\n    };\n\n    // Schema for time and URL data\n    // var time_url_cols = [{\n    //   id: \"id\",\n    //   dataType: tableau.dataTypeEnum.string\n    // }, {\n    //   id: \"time\",\n    //   alias: \"time\",\n    //   dataType: tableau.dataTypeEnum.date\n    // }, {\n    //   id: \"url\",\n    //   alias: \"url\",\n    //   dataType: tableau.dataTypeEnum.string\n    // }];\n\n    //var timeUrlTable = {\n    //    id: \"timeUrl\",\n    //    alias: \"Time and URL Data\",\n    //    columns: time_url_cols\n    //};\n\n    schemaCallback([\n      signalTable,\n      // timeUrlTable\n    ]);\n  };\n\n  myConnector.init = function(initCallback) {\n    tableau.authType = tableau.authTypeEnum.custom;\n\n    // If we are in the auth phase we only want to show the UI needed for auth\n    if (tableau.phase == tableau.phaseEnum.authPhase) {\n      $(\"#getvenuesbutton\").css(\"display\", \"none\");\n    }\n\n    if (tableau.phase == tableau.phaseEnum.gatherDataPhase) {\n      // If API that WDC is using has an enpoint that checks\n      // the validity of an access token, that could be used here.\n      // Then the WDC can call tableau.abortForAuth if that access token\n      // is invalid.\n    }\n\n    var accessToken = Object(_auth_js__WEBPACK_IMPORTED_MODULE_0__[\"getAuthHeaders\"])().Authorization;\n    var hasAuth = (accessToken && accessToken.length > 0) || tableau.password.length > 0;\n    updateUIWithAuthState(hasAuth);\n\n    initCallback();\n\n    // If we are not in the data gathering phase, we want to store the token\n    // This allows us to access the token in the data gathering phase\n    if (tableau.phase == tableau.phaseEnum.interactivePhase || tableau.phase == tableau.phaseEnum.authPhase) {\n      if (hasAuth) {\n        tableau.password = accessToken;\n\n        if (tableau.phase == tableau.phaseEnum.authPhase) {\n          // Auto-submit here if we are in the auth phase\n          tableau.submit();\n        }\n\n        return;\n      }\n    }\n  };\n\n  // Download the data\n  myConnector.getData = function(table, doneCallback) {\n    // var dateObj = JSON.parse(tableau.connectionData),\n    // dateString = \"starttime=\" + dateObj.startDate + \"&endtime=\" + dateObj.endDate,\n\n    var apiCall = window.auth.API_ROOT + \"signals/auth/signal/\";  // + dateString + \"\";\n    // var apiCall = \"http://localhost:8760/localhost:8000/signals/auth/signal/\";  // + dateString + \"\";\n\n    var params = {\n      \"format\": \"json\",\n      // \"detailed\": 1,\n      \"page_size\": 100,\n      \"page\": 1,\n    };\n\n    var feat = [];\n    var promises = [];\n    var totalcount = 0;\n\n    function getPage(page) {\n\n      params.page = page;\n\n      // set auth headers\n      $.ajaxSetup({\n        headers : { \"Authorization\": tableau.password }\n      });\n\n      promises.push($.getJSON(apiCall, params, function(resp) {\n\n        totalcount = resp.count;\n        feat = resp.results;\n\n        var tableData = [];\n        var i = 0;\n        var row = [];\n        var len = 0;\n\n        if( feat === undefined || feat.length === 0 ){\n          return;\n        } else {\n          if (table.tableInfo.id == \"signals\") {\n            for (i = 0, len = feat.length; i < len; i++) {\n              row = {\n                \"id\": feat[i].id,\n                \"signal_id\": feat[i].signal_id,\n                \"address\": feat[i].location.address_text,\n                \"stadsdeel\": feat[i].location.stadsdeel,\n                \"buurt_code\": feat[i].location.buurt_code,\n                \"lon\": feat[i].location.geometrie.coordinates[0],\n                \"lat\": feat[i].location.geometrie.coordinates[1],\n                \"status\": feat[i].status.state,\n                \"category main\": feat[i].category.main,\n                \"category sub\": feat[i].category.sub,\n                \"text\": feat[i].text,\n                \"text_extra\": feat[i].text_extra,\n                \"created_at\": feat[i].created_at,\n                \"incident_date_start\": feat[i].incident_date_start,\n                \"incident_date_end\": feat[i].incident_date_end,\n                \"extra_properties\": feat[i].extra_properties\n              };\n\n              //if(feat[i].well !== null) {\n              //  row.lon = feat[i].well.geometrie.coordinates[0];\n              //  row.lat = feat[i].well.geometrie.coordinates[1];\n              //  row.buurt_code = feat[i].well.buurt_code;\n              //  row.site = feat[i].well.site;\n              //}\n              //for each (datefield in alldatefiels){\n              //  if(row.placing_date !== null) {\n              //    row.placing_date = row.placing_date.toString().slice(0, 10);\n              //  }\n              //}\n\n              tableData.push(row);\n            }\n          }\n          table.appendRows(tableData);\n        }\n      }));\n    }\n\n    function loadAPI(totalpages){\n      var page = 2;\n      while (page <= totalpages){\n        // get the next page.\n        getPage(page);\n        page += 1;\n      }\n    }\n\n    function slurpAPI(){\n      // load the fist page\n      getPage(1);\n      $.when.apply($, promises).then(function(){\n        loadAPI(Math.ceil(totalcount / params.page_size));\n      });\n    }\n\n    slurpAPI();\n\n    // wait until all pages are loaded.\n    $.when.apply($, promises).then(function(){\n      // we are done loading out api\n      doneCallback();\n    });\n\n  };\n\n  // This function togglels the label shown depending\n  // on whether or not the user has been authenticated\n  function updateUIWithAuthState(hasAuth) {\n    if (hasAuth) {\n      $(\".notsignedin\").css(\"display\", \"none\");\n      $(\".signedin\").css(\"display\", \"block\");\n    } else {\n      $(\".notsignedin\").css(\"display\", \"block\");\n      $(\".signedin\").css(\"display\", \"none\");\n    }\n\n  }\n\n  $(document).ready(function() {\n    $(\"#submitButton\").click(function() {\n      tableau.connectionName = \"Signals\"; // This will be the data source name in Tableau\n      tableau.submit(); // This sends the connector object to Tableau\n    });\n\n    window.auth.initAuth();\n\n    var hasauth = window.auth.isAuthenticated();\n    updateUIWithAuthState(hasauth);\n\n    $(\"#loginButton\").click(function() {\n      window.auth.login();\n    });\n  });\n\n  tableau.registerConnector(myConnector);\n\n})();\n\n\n//# sourceURL=webpack:///./signal.js?");

/***/ }),

/***/ "./state-token-generator/state-token-generator.js":
/*!********************************************************!*\
  !*** ./state-token-generator/state-token-generator.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Generates a string of 16 random Ascii characters using the native\n * `crypto` library and `btoa`.\n *\n * For IE11 it uses the prefixed `msCrypto` library. In case no crypto\n * library exists in the current environment an empty string will be\n * returned.\n *\n * @returns {string} 16 random Ascii characters, empty in case the\n * `crypto` library is not available.\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  // Backwards compatible with msCrypto in IE11\n  const cryptoLib = window.crypto ||\n    window.msCrypto; // eslint-disable-line no-undef\n\n  if (!cryptoLib) {\n    return '';\n  }\n\n  // Create an array of 16 8-bit unsigned integers\n  const list = new Uint8Array(16);\n  // Populate the array with random values\n  cryptoLib.getRandomValues(list);\n\n  // Binary to Ascii (btoa) converts our (character representation\n  // of) our binary data to an Ascii string\n  return btoa(Array\n    .from(list) // convert to normal array\n    .map((n) => String.fromCharCode(n)) // convert each integer to a character\n    .join('')); // convert to a string of characters\n});\n\n\n//# sourceURL=webpack:///./state-token-generator/state-token-generator.js?");

/***/ })

/******/ });