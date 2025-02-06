/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_API_KEY: string; // Declare the type for the environment variable
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }