import range from 'lodash.range';
import bluebird from 'bluebird';
import fetchJson from './fetchJson';

export default function(table, scraperMapping, token, options, doneCallback) {
  const {
    limit,
    parallel = 5,
    params:additionalParams
  } = options;

  const defaultParams = {
    'format': 'json',
    'page_size': 100,
    ...additionalParams
  };

  // NOTE: only use documented fields from table.tableInfo!
  // Other fields will not be presented in the actual Tableau (desktop) environment!!!
  // See https://tableau.github.io/webdataconnector/docs/api_ref.html#webdataconnectorapi.tableinfo-1
  const { id } = table.tableInfo;
  const { endPoint, requiresAuthentication, apiToSchemaMapper } = scraperMapping[id];

  let errorLogged = false;
  let numberOfPages;
  let loadedCount = 0;
  let retrieving = [];

  // set auth headers
  if (requiresAuthentication && token) {
    $.ajaxSetup({
      headers : { 'Authorization': token }
    });
  }

  const logError = message => {
    errorLogged = true;
    console.error(message);
    tableau.reportProgress(message);
  };

  const logProgress = () => {
    const loadedMessage = `Loaded: ${loadedCount} of ${numberOfPages ? numberOfPages : '?'} pages`;
    const message = retrieving.length == 0
      ? loadedMessage
      : `${loadedMessage}, retrieving page(s): ${retrieving.join(', ')}`;
    console.log(message);

    if (!errorLogged) {
      // Only log progress if no error has occurred, or else we may overwrite error report.
      tableau.reportProgress(message);
    }
  };

  const logPageLoad = page => {
    retrieving.push(page);
    logProgress();
  };

  const logPageDone = page => {
    console.log('data loaded for page ', page);
    retrieving.splice(retrieving.indexOf(page), 1 );
    loadedCount += 1;
    logProgress();
  };

  function getPage(page) {
    logPageLoad(page);

    const params = {
      ...defaultParams,
      page: page
    };

    if (limit > 0 && params.page_size > limit) {
      // Limit page_size so we don't overfetch
      params.page_size = limit;
    }

    return fetchJson(endPoint, params)
      .then(json => {
        const results = json.results;
        const tableData = [];

        if (results === undefined || results.length === 0) {
          throw new Error(`unexpected results: ${results}`);
        } else {
          results.forEach(result => {
            const row = apiToSchemaMapper(result);
            tableData.push(row);
          });
          table.appendRows(tableData);
        }
        logPageDone(page);
        return json;
      });
  }

  async function slurpAPI() {
    try {
      const json = await getPage(1);

      const itemCount = json.count;
      const totalPages = Math.ceil(itemCount / defaultParams.page_size);

      if (totalPages <= 1) {
        // done
        Promise.resolve();
      } else {
        // get more pages
        numberOfPages = limit > 0 ? Math.ceil(limit / defaultParams.page_size) : totalPages;
        console.log(`Retrieving ${numberOfPages} pages of page size ${defaultParams.page_size}`);
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
  }).catch(error => {
    logError(`"${error}". Stopping...`);
    // Delay calling doneCallBack so error is visible in Tableau desktop
    setTimeout(doneCallback, 10000); // Delay in ms
  });
}
