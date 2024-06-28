import Sidebar from "@prima/components/Sidebar";
import { COOKIE_NAME } from "@prima/middleware";
import { cookies } from "next/headers";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const token = cookies().get(COOKIE_NAME.JWT_TOKEN)?.value;
  return (
    <section className='flex h-screen overflow-hidden'>
      <Sidebar token={token as string} />

      <div className='flex h-full overflow-hidden flex-1'>{children}</div>
    </section>
  );
};

export default RootLayout;
