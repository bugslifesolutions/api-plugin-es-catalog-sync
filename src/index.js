import pkg from "../package.json";
import policies from "./policies.json";
import startup from "./startup.js";

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
      startup: [startup]
    },
    policies,
  });
}
