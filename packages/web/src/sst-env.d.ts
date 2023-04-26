/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string
  readonly VITE_HYGRAPH_ENDPOINT: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}