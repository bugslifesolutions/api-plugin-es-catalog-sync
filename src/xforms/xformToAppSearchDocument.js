import { customCatalogFieldsToIndex } from "../registration.js";
import _ from "lodash";

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
  "_id",
  "applianceType",
  "brand"
];

const catalogFieldToAppSearchDocumentField = {
  "_id": "id"
}
/**
 * @param {Object}  The `catalog` items as per the Catalog collection
 * @returns {Object} An Elastic App Search compatible representation of a `catalog` item
 */
export default function xformToAppSearchDocument(catalogProduct) {
  let catalogFieldsToIndex = new Set(defaultCatalogFieldsToIndex);
  catalogFieldsToIndex.add(...customCatalogFieldsToIndex);
  let appSearchDocument = {};
  var value;
  var appDocKey;
  catalogFieldsToIndex.forEach(key => {
    value = catalogProduct[key];
    if (undefined != value) {
      appDocKey = catalogFieldToAppSearchDocumentField[key] || _.snakeCase(key);
      appSearchDocument[ appDocKey ] = value;
    }
  });
  return appSearchDocument
}
