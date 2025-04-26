export const AWS_ACCOUNT_ID = "575108950320";
export const AWS_REGION = "us-east-1";
export const ENVIRONMENT = process.env.ENVIRONMENT ?? "dev";

export const APEX_DOMAIN = "koalatek.com";
export const API_GATEWAY_SUBDOMAIN = `${ENVIRONMENT}.api.suchalist`;
export const API_GATEWAY_DOMAIN = `${API_GATEWAY_SUBDOMAIN}.${APEX_DOMAIN}`;

export const APPLE_ISSUER_ID = process.env.APPLE_ISSUER_ID ?? "";
export const APPLE_KEY_ID = process.env.APPLE_KEY_ID ?? "";
