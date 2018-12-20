import scraperPage from './scraper-page.js';
import scraperCursor from './scraper-cursor.js';
import { PAGINATION_TYPE } from './paginationType';

export default function(table, scraperMapping, token, doneCallback) {
  const {id} = table.tableInfo;
  const {paginationType} = scraperMapping[id];

  console.log(`scraping ${id}, ${paginationType}`);
  switch (paginationType) {
    case PAGINATION_TYPE.CURSOR:
      scraperCursor(table, scraperMapping, token, doneCallback);
      break;
    case PAGINATION_TYPE.PAGE:
      scraperPage(table, scraperMapping, token, doneCallback);
      break;
    default:
      console.error(`unkoown pagination type ${id}: {$paginationType}`);
      doneCallback();
      break;
  }

}
