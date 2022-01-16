import { customTransforms } from "../registration.js";

/**
 *
 * @param {object} catalogProduct An instance of a Catalog product object.
 * @returns {object} transformed catalog product object
 */
function catalogTransform(catalogProduct) {
  const thumbnail = catalogProduct.primaryImage && catalogProduct.primaryImage.URLs && catalogProduct.primaryImage.URLs.thumbnail;
  //
  return {
    id: catalogProduct._id,
    // eslint-disable-next-line camelcase
    page_title: catalogProduct.pageTitle,
    // eslint-disable-next-line camelcase
    created_at: catalogProduct.createdAt,
    description: catalogProduct.description,
    title: catalogProduct.title,
    slug: catalogProduct.slug,
    sku: catalogProduct.sku,
    // eslint-disable-next-line camelcase
    product_id: catalogProduct.productId,
    // eslint-disable-next-line camelcase
    primary_image_thumbnail_url: thumbnail,
    // eslint-disable-next-line camelcase
    tag_name: catalogProduct.tags && catalogProduct.tags.map((tag) => tag.displayTitle)
  };
}

const defaultTransforms = {
  catalog: [catalogTransform]
};

// eslint-disable-next-line no-unused-vars
const exampleCatalogProduct = {
  _id: "QW6RmogjsvEx6RdB2",
  barcode: undefined,
  createdAt: {
  },
  description: "Note: As per manufacturer a new screw is needed to mount door cam. This door cam is sold individually.",
  height: undefined,
  isDeleted: false,
  isVisible: true,
  length: undefined,
  media: [
  ],
  metafields: undefined,
  metaDescription: undefined,
  originCountry: "BZ",
  pageTitle: "Don't Do It",
  parcel: undefined,
  primaryImage: null,
  productId: "QW6RmogjsvEx6RdB2",
  productType: undefined,
  shopId: "GJDoW4pdR4XdziSEW",
  sku: undefined,
  slug: "door-cam",
  socialMetadata: [
    {
      service: "twitter",
      message: undefined
    },
    {
      service: "facebook",
      message: undefined
    },
    {
      service: "googleplus",
      message: undefined
    },
    {
      service: "pinterest",
      message: undefined
    }
  ],
  supportedFulfillmentTypes: [
    "shipping"
  ],
  tagIds: undefined,
  title: "Door Cam",
  type: "product-simple",
  updatedAt: {
  },
  variants: [
    {
      _id: "wgtmRahDcZ6XeahPg",
      attributeLabel: "color",
      barcode: undefined,
      createdAt: {
      },
      height: null,
      index: 0,
      length: null,
      media: [
      ],
      metafields: undefined,
      minOrderQuantity: undefined,
      optionTitle: "red",
      originCountry: "BB",
      primaryImage: null,
      shopId: "GJDoW4pdR4XdziSEW",
      sku: undefined,
      title: "Door Cam",
      updatedAt: {
      },
      variantId: "wgtmRahDcZ6XeahPg",
      weight: null,
      width: null,
      pricing: {
        USD: {
          compareAtPrice: null,
          displayPrice: "$94,000.00",
          maxPrice: 94000,
          minPrice: 94000,
          price: 94000
        }
      },
      isSoldOut: false,
      isTaxable: true,
      taxCode: undefined,
      taxDescription: undefined
    }
  ],
  vendor: null,
  weight: undefined,
  width: undefined,
  pricing: {
    USD: {
      compareAtPrice: null,
      displayPrice: "$94,000.00",
      maxPrice: 94000,
      minPrice: 94000,
      price: null
    }
  },
  isBackorder: false,
  isLowQuantity: false,
  isSoldOut: false
};

/**
 * @param {string} type The name/label identifying the desired set of transforms
 * @returns {[]} the set of effective transformation functions
 */
function effectiveTransforms(type) {
  const custom = customTransforms[type] || [];
  const def = defaultTransforms[type] || [];
  return [...def, ...custom];
}

/**
 * @param {string} type The name/label identifying the desired transformation function
 * @returns {function} A function that takes a sourceObject and returns a transformedObject.
 */
export default function xformFor(type) {
  const transforms = effectiveTransforms(type);
  if (!transforms) return (sourceObject) => (sourceObject);
  return (sourceObject) => {
    const transformedObject = Object.assign({}, ...(transforms.map((transform) => transform(sourceObject))));
    return transformedObject;
  };
}
