import customCatalogFieldsToIndex from "../registration";

const defaultCatalogFieldsToIndex = [
  "productNumber",
  "sku",
  "pageTitle",
  "createdAt",
  "description",
  "title",
  "updatedAt",
  "price",
  "handle",
  "tags",
  "id",
  "applianceType",
  "brand"
];

/**
 * @param {Object}  The `catalog` items as per the Catalog collection
 * @returns {Object} An Elastic App Search compatible representation of a `catalog` item
 */
export default function xformToAppSearchDocument(catalogProduct) {
  let catalogFieldsToIndex = new Set();
  catalogFieldsToIndex.push(defaultCatalogFieldsToIndex, customCatalogFieldsToIndex);
  let appSearchDocument = Object.assign({}, ...catalogFieldsToIndex.map( key => ({[snakeCase(key)]:catalogProduct[key]})));
  return appSearchDocument
}

function snakeCase(value) {
  return value;
}