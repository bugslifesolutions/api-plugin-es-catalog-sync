/**
 * A registerPluginHandler function may NOT return a Promise. 
 * If you need to do something async with the data, just save it off for now. 
 * Then create and register a startup type function, which imports the data 
 * you saved off, does the async tasks, and returns a Promise. 
 * Startup functions are called immediately after registerPluginHandler functions
 * as the app is starting.
 */

export const customCatalogFieldsToIndex = [];

export default function registerPluginHandler( { catalogIndex } ) {
    if (catalogIndex) {
        const { catalogFieldsToIndex } = catalogIndex;
        if (Array.isArray(catalogFieldsToIndex)) {
            customCatalogFieldsToIndex.push(...catalogFieldsToIndex);
        }
    }
}
