import { loginWithGithub } from "@prima/api";
import { COOKIE_NAME, getAppUrl } from "@prima/middleware";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const redirectTo = (path: string) =>
    Response.redirect(new URL(path, request.url));

  const url = new URL(request.url);
  const { code } = Object.fromEntries(url.searchParams.entries());

  if (!code) {
    return redirectTo(getAppUrl("/login"));
  }

  try {
    const response = await loginWithGithub(code);
    if (response.isSuccess) {
      const { jwtToken } = response.data;
      cookies().set(COOKIE_NAME.JWT_TOKEN, jwtToken);

      return redirectTo(getAppUrl("/dashboard"));
    }
  } catch (error: any) {
    console.error("Login Error: ", error);
  } finally {
    return redirectTo(getAppUrl("/login"));
  }
}
