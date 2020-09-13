/**
 * @param {Object[]} catalogProductVariants The `product.variants` array from a catalog item
 * @returns {Object[]} All variants and their options flattened in one array
 */
export default function getFlatVariantsAndOptions(catalogProductVariants) {
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