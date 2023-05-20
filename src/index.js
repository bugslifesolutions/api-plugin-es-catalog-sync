import pkg from "../package.json";
import policies from "./policies.json";
import startup from "./startup.js";
import registerPluginHandler from "./registration.js";

/** todo: refactor to make easier to add watching and indexing other collections.
 * maybe add a graphQL resolver with a mutation for a 'watch and index' responsibility; 'IndexSynchronizer' 'ListeningElasticIndexer' 'EventStash'.
 * EventStash -
 * {
 *   reaction_event_name: 'afterPublishProductToCatalog',
 *   documentTransform: function(context, document) returns object
 *   stash: function(document)
 * }
 * Helper ElasticStash function (indexName, optional client config) returns a configured stash(object) function
 */

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: pkg.description,
    name: pkg.name,
    version: pkg.version,
    functionsByType: {
      registerPluginHandler: [registerPluginHandler],
      startup: [startup]
    },
    policies
  });
}
