/**
 * A registerPluginHandler function may NOT return a Promise.
 * If you need to do something async with the data, just save it off for now.
 * Then create and register a startup type function, which imports the data
 * you saved off, does the async tasks, and returns a Promise.
 * Startup functions are called immediately after registerPluginHandler functions
 * as the app is starting.
 */

/**
 * The properties/entries of the customTransforms have the following semantics:
 * - property Name/Key identifies the type of Object the Value should be applied to.
 * - property Value is a list of transform functions that will be called with the source object and returns the transformed object (sourceObject) => (transformedObject)
 */
export const customTransforms = {};

const mergeEntries = ([key, transformsForKeyTypedObject]) => {
  const transforms = Array.isArray(transformsForKeyTypedObject) ? transformsForKeyTypedObject : new Array(transformsForKeyTypedObject)
  return [key, [...(customTransforms[key]) || [], ...transforms]];
};

/**
 * Merges the provided appSearch.transforms with the global customTransforms.
 * @param {object} appSearch The appSearch object configuration.
 * @returns {void}
 */
export default function registerPluginHandler({ appSearch }) {
  if (appSearch) {
    const { transforms } = appSearch;
    const mergedEntries = Object.entries(transforms).map(mergeEntries);
    const mergedTransforms = Object.fromEntries(mergedEntries);
    Object.assign(customTransforms, mergedTransforms);
  }
}
