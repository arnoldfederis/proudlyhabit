import { createEnv } from "@t3-oss/env-nextjs";
import { minLength, string } from "zod/mini";

export const env = createEnv({
  server: {
    APP_STORE_PROVIDER_TOKEN: string().check(minLength(1, "APP_STORE_PROVIDER_TOKEN is required")),
  },
  client: {},
  experimental__runtimeEnv: {},
});
