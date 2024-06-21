import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { GitHubUser } from "./interface";
import ENV from "@prima/config/env";

export const createQueryParams = (params: { [key: string]: any }) => {
  return new URLSearchParams(params).toString();
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getSynchronized = () => {
  return sleep(1000);
};

export const loginWithGithub = async (code: string) => {
  return { isSuccess: 1, data: { jwtToken: "jwtToken" } };

  const queryParams = createQueryParams({ code });
  const url = `${ENV.API_URL}/oauth/callback?${queryParams}`;

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const logoutWithGithub = async () => {
  return { isSuccess: 1, data: null };

  const url = `${ENV.API_URL}/api/v1/logout`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const fetchGithubUser = async (
  token: RequestCookie | undefined
): Promise<GitHubUser> => {
  await sleep(5000);

  return {
    login: "ram-primathon",
    id: 123456789,
    node_id: "MDQ6VXNlcjE=",
    avatar_url: "https://avatars.githubusercontent.com/u/59244208?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/ram-primathon",
    html_url: "https://github.com/ram-primathon",
    followers_url: "https://api.github.com/users/ram-primathon/followers",
    following_url:
      "https://api.github.com/users/ram-primathon/following{/other_user}",
    gists_url: "https://api.github.com/users/ram-primathon/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/ram-primathon/starred{/owner}{/repo}",
    subscriptions_url:
      "https://api.github.com/users/ram-primathon/subscriptions",
    organizations_url: "https://api.github.com/users/ram-primathon/orgs",
    repos_url: "https://api.github.com/users/ram-primathon/repos",
    events_url: "https://api.github.com/users/ram-primathon/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/ram-primathon/received_events",
    type: "User",
    site_admin: false,
    name: "Ram Primathon",
    company: "PrimaTech",
    blog: "https://primathon.com",
    location: "San Francisco, CA",
    email: "ram.primathon@example.com",
    hireable: true,
    bio: "Passionate software engineer building cool things.",
    twitter_username: "ramprimathon",
    public_repos: 20,
    public_gists: 10,
    followers: 100,
    following: 50,
    created_at: "2015-07-01T08:00:00Z",
    updated_at: "2024-06-21T08:00:00Z",
  };
  const url = `${ENV.API_URL}/api/v1/user`;
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `token ${token}`,
    },
  }).then((res) => res.json());
};
