import scraperPage from './scraper-page.js';
import scraperCursor from './scraper-cursor.js';
import { PAGINATION_TYPE } from '../paginationType';

export default function(table, scraperMapping, token, options, doneCallback) {
  const {id} = table.tableInfo;
  const {paginationType} = scraperMapping[id];

  console.log(`scraping ${id}, ${paginationType}`);
  switch (paginationType) {
    case PAGINATION_TYPE.CURSOR:
      scraperCursor(table, scraperMapping, token, options, doneCallback);
      break;
    case PAGINATION_TYPE.PAGE:
      scraperPage(table, scraperMapping, token, options, doneCallback);
      break;
    default:
      console.error(`unknown pagination type ${id}: {$paginationType}`);
      doneCallback();
      break;
  }

}
