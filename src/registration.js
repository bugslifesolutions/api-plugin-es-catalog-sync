/**
 * A registerPluginHandler function may NOT return a Promise.
 * If you need to do something async with the data, just save it off for now.
 * Then create and register a startup type function, which imports the data
 * you saved off, does the async tasks, and returns a Promise.
 * Startup functions are called immediately after registerPluginHandler functions
 * as the app is starting.
 */

/**
 * Key identifies the type of Object
 * Value is a list of tranform functions that will be called receives the source object and returns the transformed object (sourceObject) => (transformedObject)
 * The transformed object will be assigned to the target object.
 */
export const customTransforms = {};

/**
 * Initializes the shared customTransforms using the provided appSearch.tranforms.
 * @param {object} appSearch The appSearch object configuration.
 * @returns {void}
 */
export default function registerPluginHandler({ appSearch }) {
  if (appSearch) {
    const { transforms } = appSearch;
    const mergedTransforms = Object.fromEntries(Object.entries(transforms)
      .map(([key, transformList]) => [key, [...(customTransforms[key]) || [], ...transformList]]));
    Object.assign(customTransforms, mergedTransforms);
  }
}
