import ENV from "@prima/config/env";

export const GITHUB_OAUTH_URL = `https://github.com/login/oauth/authorize?client_id=${ENV.GITHUB_APP_CLIENT_ID}&scope=user:email,read:org&state=github`;
export const GITHUB_APP_URL = `https://github.com/apps/${ENV.GITHUB_APP_NAME}/installations/select_target`;
