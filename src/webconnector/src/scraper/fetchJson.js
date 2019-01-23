const constructQuery = params => {
  return Object.entries(params).map(keyValue => keyValue.join('=')).join('&');
};

/**
 * Fetch json for endpoint and return Vanilla promise
 * Abstracts away the underlying logic (jQuery.getJSON)
 * @param url
 * @param params
 * @returns
 */
const fetchJsonOnce = (url, params) => {
  return new Promise((resolve, reject) => {
    return $.getJSON(url, params, json => {
      resolve(json);
    })
      .fail((error) => {
        reject(`fetchJson error: "${error.statusText}"`);
      });
  });
};

/**
 * Wrap fetchJson in promise retry loop
 *  Logs if not first try
 *  Last error is send wrapped in Promise.reject if no more retries left.
 * @param url same as fetchJsonOnce function
 * @param params same as fetchJsonOnce function
 * @param retries number of retries remaining
 * @param first indicates if this is the first attempt
 * @param error error thrown by last attempt
 * @returns Promise
 */
const fetchJson = (url, params, retries=3, first = true, error=undefined) => {
  const query = constructQuery(params);

  if (retries <= 0) {
    const errorMessage = `${error}, retries failed`;
    console.error(`${url}&${query}: ${query} ${errorMessage}`);
    return Promise.reject(new Error(errorMessage));
  }

  if (!first) {
    // only log attempts when at least one attempt has failed
    console.log(`fetching ${url}&${query}, retries: ${retries}`);
  }
  return fetchJsonOnce(url, params).catch(error => {
    return fetchJson(url, params, retries - 1, false, error);
  });
};

export default fetchJson;
