import Loading from "@prima/components/Loading";

const DashboardLoading = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-white absolute left-0 right-0 top-0 bottom-0 z-10'>
      <Loading />
    </div>
  );
};

export default DashboardLoading;
