const dev = true;

const BASE_URL_DEV = "http://localhost:80";
const BASE_URL_PROD = "https://api-hrelix.blufin.co.in";

export const BASE_URL = dev ? BASE_URL_DEV : BASE_URL_PROD;
