const MAX_PAGES = 3; // Don't render to much. Tableau simulator can't handle more than a tiny bit of data.

export default function(table, scraperMapping, token, doneCallback) {
  const defaultParams = {
    "format": "json",
    "page_size": 1000,
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
    // Hack to prevent $.getJSON from adding duplicate get parameters,
    // parameters already present in the endpoint are merged with default parameters
    // using JS object spreading removing duplicates.
    const bareEndpoint = endpoint.split("?")[0];
    const urlParams = new URLSearchParams(endpoint.split("?")[1]);
    const params = { ...defaultParams };
    const entries = Array.from(urlParams.entries());
    entries.forEach( ([key, value]) => params[key]= value);

    console.time(endpoint);
    return $.getJSON(bareEndpoint, params, (json) => {
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
    });
  }

  async function slurpCursorAPI() {
    let page = 1;
    let next;
    try {
      const { endPoint } = scraperMapping[id];
      next = endPoint;
      do {
        console.log('>>> getting page: ', page, next);
        const json = await getEndpoint(next);
        next = json._links.next && json._links.next.href;
        page += 1;
      } while(next && page < MAX_PAGES);
    } catch (error) {
      console.error(`Couldn\'t load page ${id}, page: ${page}, ${next}: `, error);
      throw error;
    }
  }

  const t0 = performance.now();
  slurpCursorAPI().then(() => {
    // we are done loading API
    const diff = performance.now() - t0; // milliseconds
    console.log(`Done loading API ${diff/1000}s`);
    doneCallback();
  }).catch(() => {
    console.error('Cancelling...');
    doneCallback();
  })
};
