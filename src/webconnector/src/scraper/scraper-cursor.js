const MAX_PAGES = 1000000;

export default function(table, scraperMapping, token, options, doneCallback) {
  const { limit } = options;
  const defaultParams = {
    'format': 'json',
    'page_size': 20000,
  };

  // NOTE: only use documented fields from table.tableInfo!
  // Other fields will not be presented in the actual Tableau environment!!!
  // See https://tableau.github.io/webdataconnector/docs/api_ref.html#webdataconnectorapi.tableinfo-1
  const { id } = table.tableInfo;
  const { requiresAuthentication, apiToSchemaMapper } = scraperMapping[id];

  // set auth headers
  if (requiresAuthentication && token) {
    $.ajaxSetup({
      headers : { 'Authorization': token }
    });
  }

  function getEndpoint(endpoint) {
    console.log('>>> getting endpoint: ', endpoint);
    // Hack to prevent $.getJSON from adding duplicate get parameters,
    // parameters already present in the endpoint are merged with default parameters
    // using JS object spreading removing duplicates.
    const bareEndpoint = endpoint.split('?')[0];
    const urlParams = new URLSearchParams(endpoint.split('?')[1]);
    const params = { ...defaultParams };
    const entries = Array.from(urlParams.entries());
    entries.forEach( ([key, value]) => params[key]= value);

    console.time(endpoint);

    // Converting Json promise to ES6 Promise
    return new Promise((resolve, reject) => {

      // Make json call
      $.getJSON(bareEndpoint, params, (json) => {
        const results = json.results;
        const tableData = [];

        if (results === undefined || results.length === 0) {
          throw new Error(`Unexpected empty results: ${results}`);
        } else {
          results.forEach(result => {
            const row = apiToSchemaMapper(result);
            tableData.push(row);
          });
          table.appendRows(tableData);
          // console.log('data loaded for endpoint: ', endpoint);
        }

        return json;
      })
        .then(resolve)
        .fail(reject);
    });
  }

  function slurpCursorAPI() {
    let page = 1;
    const maxPages = limit > 0 ? Math.ceil(limit / defaultParams.page_size) : MAX_PAGES;
    console.log(`Retrieving up to ${maxPages} pages of page size ${defaultParams.page_size}`);

    function getEndpointPromiseLoop(json) {
      const next = json._links.next && json._links.next.href;
      page += 1;
      next && page <= maxPages && tableau.reportProgress(`Retrieved page ${page}, total rows ${page * defaultParams.page_size}`);
      return next && page <= maxPages
        ? getEndpoint(next)
          .then(getEndpointPromiseLoop)
          .catch((error) => {
            console.error(`Couldn't load page ${id}, page: ${page}, ${next}: `, error);
            throw error;
          })
        : Promise.resolve();
    }

    const { endPoint } = scraperMapping[id];
    return getEndpoint(endPoint).then(getEndpointPromiseLoop);
  }

  const t0 = performance.now();
  slurpCursorAPI().then(() => {
    // we are done loading API
    const diff = performance.now() - t0; // milliseconds
    console.log(`Done loading API ${diff/1000}s`);
    doneCallback();
  }).catch((e) => {
    console.error('Cancelling...', e);
    doneCallback();
  });
}
