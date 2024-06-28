import ENV from "@prima/config/env";
import { fetchWithAuth } from "./utils";
import { IGitHubUser } from "./IGitHubUser";
import { ApiResponse } from "./interface";
import { IRepository } from "./IRepository";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getSynchronized = () => {
  return sleep(1000);
};

export const loginWithGithub = async (
  code: string
): Promise<ApiResponse<string>> => {
  const url = `${ENV.API_URL}/oauth/callback`;
  return fetchWithAuth(url, "GET", "", null, { code });
};

export const logoutWithGithub = async (): Promise<ApiResponse> => {
  const url = `${ENV.API_URL}/logout`;
  return fetchWithAuth(url, "POST");
};

export const fetchGithubUser = async (
  token: string
): Promise<ApiResponse<IGitHubUser>> => {
  const url = `${ENV.API_URL}/github/user`;
  return fetchWithAuth(url, "GET", token);
};

export const fetchGithubRepos = async (
  token: string
): Promise<ApiResponse<IRepository[]>> => {
  const url = `${ENV.API_URL}/github/repos`;
  return fetchWithAuth(url, "GET", token);
};
