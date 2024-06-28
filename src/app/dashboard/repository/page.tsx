import RepositoryHeader from "@prima/components/RepositoryHeader";
import RepositoryTable from "@prima/components/RepositoryTable";
import { COOKIE_NAME } from "@prima/middleware";
import { cookies } from "next/headers";

const Repository = async () => {
  const token = cookies().get(COOKIE_NAME.JWT_TOKEN)?.value as string;
  return (
    <main className='w-full p-8 bg-gray-100 overflow-y-auto'>
      <RepositoryHeader />
      <RepositoryTable token={token} />
    </main>
  );
};

export default Repository;
