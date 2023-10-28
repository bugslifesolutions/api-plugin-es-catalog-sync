import { str, url, cleanEnv, testOnly } from "envalid";
import Logger from "@reactioncommerce/logger";

const config = cleanEnv(process.env, {
  ES_CATALOG_SYNC_ENTERPRISESEARCH_URL: url({ desc: "EnterpriseSearch URL", required: true, devDefault: testOnly("http://localhost:28888/api/v1/") }),
  ES_CATALOG_SYNC_ENTERPRISESEARCH_KEY: str({ desc: "EnterpriseSearch Key", required: true, devDefault: testOnly("EnterpriseSearchKey") }),
  ES_CATALOG_SYNC_ENTERPRISESEARCH_ENGINE_NAME: str({ desc: "EnterpriseSearch Engine Name", default: "catalog" })
}, {
  dotEnvPath: null
});

const simpleConfig = {
  url: config.ES_CATALOG_SYNC_ENTERPRISESEARCH_URL,
  key: config.ES_CATALOG_SYNC_ENTERPRISESEARCH_KEY,
  engineName: config.ES_CATALOG_SYNC_ENTERPRISESEARCH_ENGINE_NAME
};
const logConfig = { ...config };
if (logConfig.ES_CATALOG_SYNC_ENTERPRISESEARCH_KEY) {
  // Hide password from auth logging
  logConfig.ES_CATALOG_SYNC_ENTERPRISESEARCH_KEY = "*".repeat(config.ES_CATALOG_SYNC_ENTERPRISESEARCH_KEY.length);
}
Logger.debug(logConfig, "es-catalog-sync config");

export default simpleConfig;
