import range from 'lodash.range';
import bluebird from 'bluebird';

export default function(table, scraperMapping, token, options, doneCallback) {
  const {
    limit,
    parallel = 5,
    params:additionalParams
  } = options;

  const params = {
    'format': 'json',
    'page_size': 100,
    ...additionalParams
  };

  // NOTE: only use documented fields from table.tableInfo!
  // Other fields will not be presented in the actual Tableau (desktop) environment!!!
  // See https://tableau.github.io/webdataconnector/docs/api_ref.html#webdataconnectorapi.tableinfo-1
  const { id } = table.tableInfo;
  const { endPoint, requiresAuthentication, apiToSchemaMapper } = scraperMapping[id];

  // set auth headers
  if (requiresAuthentication && token) {
    $.ajaxSetup({
      headers : { 'Authorization': token }
    });
  }

  function getPage(page) {
    tableau.reportProgress(`Retrieving page ${page}`);

    params.page = page;
    if (limit > 0 && params.page_size > limit) {
      // Limit page_size so we don't overfetch
      params.page_size = limit;
    }

    return $.getJSON(endPoint, params, (json) => {
      const results = json.results;
      const tableData = [];

      if (results === undefined || results.length === 0) {
        console.error('unexpected results: ', results);
        return;
      } else {
        results.forEach(result => {
          const row = apiToSchemaMapper(result);
          tableData.push(row);
        });
        table.appendRows(tableData);
        console.log('data loaded for page ', page);
      }
      return json;
    });
  }

  async function slurpAPI() {
    try {
      const json = await getPage(1);

      const itemCount = json.count;
      const totalPages = Math.ceil(itemCount / params.page_size);

      if (totalPages <= 1) {
        // done
        Promise.resolve();
      } else {
        // get more pages
        const numberOfPages = limit > 0 ? Math.ceil(limit / params.page_size) : totalPages;
        console.log(`Retrieving ${numberOfPages} pages of page size ${params.page_size}`);
        const pages = range(2, numberOfPages + 1);

        // Perform multiple promises at the same time using elements of `pages` as argument to `getPage`.
        // Note order of pages is likely out of order!
        return bluebird.map(
          pages,
          getPage,
          {concurrency: parallel}
        );
      }
    } catch (error) {
      console.error(`Couldn't load page ${id}: `, error);
      console.error('Cancelling...');
      doneCallback();
    }
  }

  const t0 = performance.now();
  slurpAPI().then(() => {
    // we are done loading out api
    const diff = performance.now() - t0; // milliseconds
    console.log(`Done loading API ${diff/1000}s`);
    doneCallback();
  });
}
