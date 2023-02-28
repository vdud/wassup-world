interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly VITE_APP_ID: string;
  readonly VITE_APP_KEY: string;
  readonly VITE_APP_SECRET: string;
  readonly VITE_APP_CLUSTER: string;
  readonly VITE_ENV_GOOGLE_MAPS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
