import Logger from "@reactioncommerce/logger";
import pkg from "../package.json";
import AppSearchClient from "@elastic/app-search-node";
import xformFor from "./xforms/xformToAppSearchDocument.js";

const logCtx = { name: pkg.name, file: "startup" };


/**
 * @summary Responsible for transforming and sending the resulting document for indexing.
 * @param {string} engineName Name of Elasticsearch App Search 'engine'
 * @param {string} sourceObjectType Object type being indexed for App Search
 * @returns {function name(esClient, sourceObject) { }}
 */
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
    const { _id: catalogProductId, tagIds, variants } = catalogProduct;

    Logger.info({ ...logCtx, catalogProductId, fn: "startup" }, "Running afterPublishProductToCatalog");

    if (tagIds) {
      const cursor = await context.queries.tagsByIds(context, tagIds);
      catalogProduct.tags = await cursor.toArray();
    }
    await indexSyncFor("applianceshack-part-catalog","catalog")(esClient, catalogProduct);
  });
}
