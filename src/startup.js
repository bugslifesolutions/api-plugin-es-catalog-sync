import Logger from "@reactioncommerce/logger";
import pkg from "../package.json";
import AppSearchClient from "@elastic/app-search-node";
import xformFor from "./xforms/xformToAppSearchDocument.js";

const logCtx = { name: pkg.name, file: "startup" };


/**
 * 
 * @param {Object} client The AppSearchClient object.
 * @param {Object} catalogProduct The 'catalog' object.
 * @param {Object[]} variantsAndOptions The flattened 'product.variants' and 'product.variants.options'.
 */
function indexCatalogProduct(client, catalogProduct, variantsAndOptions) {

}

function indexSyncFor(engineName, sourceObjectType) {
  return (esClient, sourceObject) => {
    const appSearchDoc = xformFor(sourceObjectType)(sourceObject);
    esClient.indexDocuments(engineName, appSearchDoc)
      .then(response => Logger.info({ ...logCtx, id: sourceObject._id, fn: `${sourceObject}IndexSync`, response }, `Indexed ${sourceObjectType}`))
      .catch(error => Logger.error({ ...logCtx, id: sourceObject._id, fn: `${sourceObject}IndexSync`, error }, `Failed to index ${sourceObjectType}`))
  }
}

/**
 * @summary Called on startup
 * @param {Object} context Startup context
 * @param {Object} context.collections Map of MongoDB collections
 * @returns {undefined}
 */
export default async function esCatalogProductSyncStartup(context) {
  const { appEvents, collections } = context;
  const { Cart } = collections;

  //todo: operational issue
  // - feature - the plugin is configurable via Environment settings
  const apiKey = 'private-9v8a1bkyak7kxhrcnvf6pnuk'
  const baseUrlFn = () => 'http://search:3002/api/as/v1/'
  const esClient = new AppSearchClient(undefined, apiKey, baseUrlFn)

  // Index the published catalog
  appEvents.on("afterPublishProductToCatalog", async ({ catalogProduct }) => {
    const { _id: catalogProductId, variants } = catalogProduct;

    Logger.info({ ...logCtx, catalogProductId, fn: "startup" }, "Running afterPublishProductToCatalog");

    await indexSyncFor("applianceshack-part-catalog","catalog")(esClient, catalogProduct);
  });
}
