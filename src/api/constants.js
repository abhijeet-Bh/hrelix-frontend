const dev = true;

const BASE_URL_DEV = "http://localhost:8080";
const BASE_URL_PROD = "https://your-production-url.com";

export const BASE_URL = dev ? BASE_URL_DEV : BASE_URL_PROD;
