import envalid from "envalid";
import Logger from "@reactioncommerce/logger";

const { str, url } = envalid;

const config = envalid.cleanEnv(process.env, {
  ES_CATALOG_SYNC_ENTERPRISESEARCH_URL: url({desc: "URL of Enterprise Search", required:true}),
  ES_CATALOG_SYNC_ENTERPRISESEARCH_KEY: str({desc: "Secret Key with permission to put documents", required:true})
}, {
  dotEnvPath: null
});

const simpleConfig = {
  url: config.ES_CATALOG_SYNC_ENTERPRISESEARCH_URL,
  key: config.ES_CATALOG_SYNC_ENTERPRISESEARCH_KEY
}
  const logConfig = { ...config };
  if (logConfig.ES_CATALOG_SYNC_ENTERPRISESEARCH_KEY) {
    // Hide password from auth logging
    logConfig.ES_CATALOG_SYNC_ENTERPRISESEARCH_KEY = "*".repeat(config.ES_CATALOG_SYNC_ENTERPRISESEARCH_KEY.length)
  };
  Logger.debug(logConfig, "es-catalog-sync config");
}

export default simpleConfig;
