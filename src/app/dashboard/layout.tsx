import Sidebar from "@prima/components/Sidebar";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className='flex h-screen overflow-hidden'>
      <Sidebar />

      <div className='flex h-screen overflow-hidden flex-1'>{children}</div>
    </section>
  );
};

export default RootLayout;
