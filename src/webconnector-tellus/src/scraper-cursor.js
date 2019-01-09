
// Allows limiting max results
// Useful for limiting results when using Tableau web connector simulator, because it can't handle a more than a
// tiny bit of data
const MAX_PAGES = 1000000;

export default function(table, scraperMapping, token, doneCallback, limit) {
  const defaultParams = {
    "format": "json",
    "page_size": 5000,
  };

  // set auth headers
  if (token) {
    $.ajaxSetup({
      headers : { "Authorization": token }
    });
  }

  // NOTE: only use documented fields from table.tableInfo!
  // Other fields will not be presented in the actual Tableau environment!!!
  // See https://tableau.github.io/webdataconnector/docs/api_ref.html#webdataconnectorapi.tableinfo-1
  const { id } = table.tableInfo;
  const { apiToSchemaMapper } = scraperMapping[id];

  function getEndpoint(endpoint) {
    console.log('>>> getting endpoint: ', endpoint);
    // Hack to prevent $.getJSON from adding duplicate get parameters,
    // parameters already present in the endpoint are merged with default parameters
    // using JS object spreading removing duplicates.
    const bareEndpoint = endpoint.split("?")[0];
    const urlParams = new URLSearchParams(endpoint.split("?")[1]);
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
          console.error('unexpected results: ', results);
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
    const pageSize = limit > 0 && limit < defaultParams.page_size ? limit : defaultParams.page_size;
    const maxPages = limit > 0 ? Math.ceil(limit / pageSize) : MAX_PAGES;
    console.log(`Retrieving up to ${maxPages} pages of page size ${pageSize}`);
    
    function getEndpointPromiseLoop(json) {
      const next = json._links.next && json._links.next.href;
      tableau.reportProgress(`Retrieving page ${page}, total rows ${page * pageSize}`);
      page += 1;
      return next && page <= maxPages
        ? getEndpoint(next)
          .then(getEndpointPromiseLoop)
          .catch((error) => {
            console.error(`Couldn\'t load page ${id}, page: ${page}, ${next}: `, error);
            throw error;
          })
        : Promise.resolve()
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
  })
};
