import Logger from "@reactioncommerce/logger";
import pkg from "../package.json";

const logCtx = { name: pkg.name, file: "startup" };

/**
 * @param {Object[]} catalogProductVariants The `product.variants` array from a catalog item
 * @returns {Object[]} All variants and their options flattened in one array
 */
function getFlatVariantsAndOptions(catalogProductVariants) {
  const variants = [];

  catalogProductVariants.forEach((variant) => {
    variants.push(variant);
    if (variant.options) {
      variant.options.forEach((option) => {
        variants.push(option);
      });
    }
  });

  return variants;
}

/**
 * 
 * @param {Object} catalogProduct The 'catalog' object.
 * @param {Object[]} variantsAndOptions The flattened 'product.variants' and 'product.variants.options'.
 */
function indexCatalogProduct(catalogProduct, variantsAndOptions) {

}

/**
 * @summary Called on startup
 * @param {Object} context Startup context
 * @param {Object} context.collections Map of MongoDB collections
 * @returns {undefined}
 */
export default async function esCatalogSyncStartup(context) {
  const { appEvents, collections } = context;
  const { Cart } = collections;

  // Index the published catalog
  appEvents.on("afterPublishProductToCatalog", async ({ catalogProduct }) => {
    const { _id: catalogProductId, variants } = catalogProduct;

    Logger.debug({ ...logCtx, catalogProductId, fn: "startup" }, "Running afterPublishProductToCatalog");

    const variantsAndOptions = getFlatVariantsAndOptions(variants);

    // Update all cart items that are linked with the updated variants.
    // await Promise.all(variantsAndOptions.map((variant) => updateAllCartsForVariant({ Cart, context, variant })));
    await indexCatalogProduct(catalogProduct, variantsAndOptions);
  });
}
