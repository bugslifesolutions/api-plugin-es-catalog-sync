import Logger from "@reactioncommerce/logger";
import pkg from "../package.json";
import AppSearchClient from "@elastic/app-search-node";
import xformToAppSearchDocument from "./xforms/xformToAppSearchDocument";

const logCtx = { name: pkg.name, file: "startup" };


/**
 * 
 * @param {Object} client The AppSearchClient object.
 * @param {Object} catalogProduct The 'catalog' object.
 * @param {Object[]} variantsAndOptions The flattened 'product.variants' and 'product.variants.options'.
 */
function indexCatalogProduct(client, catalogProduct, variantsAndOptions) {
  //todo: refactor into per Shop configuration
  const engineName = "applianceshack-part-catalog"
  const appSearchDoc = xformToAppSearchDocument(catalogProduct);
  client.indexDocuments(engineName, appSearchDoc)
    .then(response => Logger.info({ ...logCtx, catalogProductId: catalogProduct._id, fn: "indexCatalogProduct", response }, "Indexed catalog product"))
    .catch(error => Logger.error({ ...logCtx, catalogProductId: catalogProduct._id, fn: "indexCatalogProduct", error }, "Failed to index catalog product"))
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

  //todo: refactor into per Shop configuration
  const apiKey = 'private-9v8a1bkyak7kxhrcnvf6pnuk'
  const baseUrlFn = () => 'http://localhost:3002/api/as/v1/'
  const client = new AppSearchClient(undefined, apiKey, baseUrlFn)

  // Index the published catalog
  appEvents.on("afterPublishProductToCatalog", async ({ catalogProduct }) => {
    const { _id: catalogProductId, variants } = catalogProduct;

    Logger.info({ ...logCtx, catalogProductId, fn: "startup" }, "Running afterPublishProductToCatalog");

    await indexCatalogProduct(client, catalogProduct);
  });
}
