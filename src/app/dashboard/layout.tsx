import { fetchGithubUser } from "@prima/api";
import { GitHubUser } from "@prima/api/interface";
import Sidebar from "@prima/components/Sidebar";
import { COOKIE_NAME } from "@prima/middleware";
import { cookies } from "next/headers";

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  let user: GitHubUser | null = null;
  try {
    const token = cookies().get(COOKIE_NAME.JWT_TOKEN);
    user = await fetchGithubUser(token);
  } catch (error) {
    console.error(error);
  }

  return (
    <section className='flex h-screen overflow-hidden'>
      <Sidebar user={user} />

      <div className='flex h-screen overflow-hidden flex-1'>{children}</div>
    </section>
  );
};

export default RootLayout;
