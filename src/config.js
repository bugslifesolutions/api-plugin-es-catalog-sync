import { str, url, cleanEnv } from "envalid";
import Logger from "@reactioncommerce/logger";

const config = cleanEnv(process.env, {
  ES_CATALOG_SYNC_ENTERPRISESEARCH_URL: url({ desc: "URL of Enterprise Search", required: false }),
  ES_CATALOG_SYNC_ENTERPRISESEARCH_KEY: str({ desc: "Secret Key with permission to put documents", required: false }),
  ES_CATALOG_SYNC_ENTERPRISESEARCH_CATALOG_ENGINE_NAME: str({ desc: "The 'catalog' Enterprise Search engineName", required: false })
}, {
  dotEnvPath: null
});

const simpleConfig = {
  url: config.ES_CATALOG_SYNC_ENTERPRISESEARCH_URL,
  key: config.ES_CATALOG_SYNC_ENTERPRISESEARCH_KEY,
  engineName: config.ES_CATALOG_SYNC_ENTERPRISESEARCH_CATALOG_ENGINE_NAME
};
const logConfig = { ...config };
if (logConfig.ES_CATALOG_SYNC_ENTERPRISESEARCH_KEY) {
  // Hide password from auth logging
  logConfig.ES_CATALOG_SYNC_ENTERPRISESEARCH_KEY = "*".repeat(config.ES_CATALOG_SYNC_ENTERPRISESEARCH_KEY.length);
}
Logger.debug(logConfig, "es-catalog-sync config");

export default simpleConfig;
