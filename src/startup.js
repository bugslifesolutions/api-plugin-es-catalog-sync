import Logger from "@reactioncommerce/logger";
import AppSearchClient from "@elastic/app-search-node";
import pkg from "../package.json";
import xformFor from "./xforms/xformToAppSearchDocument.js";
import config from "./config.js";

const logCtx = { name: pkg.name, file: "startup" };


/**
 * @summary Responsible for transforming and sending the resulting document for indexing.
 * @param {string} engineName Name of Elasticsearch App Search 'engine'
 * @param {string} sourceObjectType Object type being indexed for App Search
 * @returns { function } A function (esClient, sourceObject) => void
 */
function indexSyncFor(engineName, sourceObjectType) {
  return (esClient, sourceObject) => {
    const appSearchDoc = xformFor(sourceObjectType)(sourceObject);
    esClient.indexDocuments(engineName, appSearchDoc)
      .then((response) => Logger.info({ ...logCtx, id: sourceObject._id, fn: `${sourceObject}IndexSync`, response }, `Indexed ${sourceObjectType}`))
      .catch((error) => Logger.error({ ...logCtx, id: sourceObject._id, fn: `${sourceObject}IndexSync`, error }, `Failed to index ${sourceObjectType}`));
  };
}

/**
 * @summary Called on startup
 * @param {Object} context Startup context
 * @param {Object} context.collections Map of MongoDB collections
 * @returns {undefined}
 */
export default async function esCatalogProductSyncStartup(context) {
  const { appEvents } = context;

  // eslint-disable-next-line no-unused-vars
  const esClient = new AppSearchClient({ accountHostKey: undefined, apiKey: config.key, baseUrlFn: (accountHostKey) => config.url });

  // Index the published catalog
  appEvents.on("afterPublishProductToCatalog", async ({ catalogProduct }) => {
    const { _id: catalogProductId, tagIds } = catalogProduct;

    Logger.info({ ...logCtx, catalogProductId, fn: "startup" }, "Running afterPublishProductToCatalog");

    if (tagIds) {
      const cursor = await context.queries.tagsByIds(context, tagIds);
      catalogProduct.tags = await cursor.toArray();
    }
    await indexSyncFor(config.engineName, "catalog")(esClient, catalogProduct);
  });
}
