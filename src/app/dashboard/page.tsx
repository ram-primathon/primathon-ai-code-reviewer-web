import { fetchGithubUser } from "@prima/api";
import ComingSoon from "@prima/components/ComingSoon";
import { COOKIE_NAME } from "@prima/middleware";
import { cookies } from "next/headers";

const Dashboard = async () => {
  const token = cookies().get(COOKIE_NAME.JWT_TOKEN)?.value;
  const response = await fetchGithubUser(token as string);
  console.log("Fetching user dashboard");

  console.log(response);

  return (
    <main className='w-full p-8 bg-gray-100 overflow-y-auto'>
      <ComingSoon />
    </main>
  );
};

export default Dashboard;
