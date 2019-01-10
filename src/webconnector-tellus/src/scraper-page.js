import range from 'lodash.range';
import bluebird from 'bluebird';

const PARALLEL_CALLS = 5;
const MAX_PAGES = 1000000;

export default function(table, scraperMapping, token, doneCallback, limit) {
  const params = {
    "format": "json",
    "detailed": 1,
    "page_size": 20000,
  };

  // NOTE: only use documented fields from table.tableInfo!
  // Other fields will not be presented in the actual Tableau environment!!!
  // See https://tableau.github.io/webdataconnector/docs/api_ref.html#webdataconnectorapi.tableinfo-1
  const { id } = table.tableInfo;
  const { endPoint, requiresAuthentication, apiToSchemaMapper } = scraperMapping[id];

  // set auth headers
  if (requiresAuthentication && token) {
    $.ajaxSetup({
      headers : { "Authorization": token }
    });
  }

  function getPage(page) {
    console.log('getting page: ', page);
    tableau.reportProgress(`Retrieving page ${page}`);
    params.page = page;

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
        const maxPages = limit > 0 ? Math.ceil(limit / params.page_size) : MAX_PAGES;
        const numberOfPages = Math.min(totalPages, maxPages);
        console.log(`Retrieving ${numberOfPages} pages of page size ${params.page_size}`);
        const pages = range(2, numberOfPages + 1);

        // Perform multiple promises at the same time using elements of `pages` as argument to `getPage`.
        // Note order of pages is likely out of order!
        return bluebird.map(
          pages,
          getPage,
          {concurrency: PARALLEL_CALLS}
        );
      }
    } catch (error) {
      console.error(`Couldn\'t load page ${id}: `, error);
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
};
