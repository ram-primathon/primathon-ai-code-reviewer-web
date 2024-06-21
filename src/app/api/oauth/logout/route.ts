import { cookies } from "next/headers";

import { COOKIE_NAME, getAppUrl } from "@prima/middleware";
import { logoutWithGithub } from "@prima/api";

export async function POST() {
  // Delete the cookie to logout the user
  cookies().delete(COOKIE_NAME.JWT_TOKEN);

  try {
    const response = await logoutWithGithub();
    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}
