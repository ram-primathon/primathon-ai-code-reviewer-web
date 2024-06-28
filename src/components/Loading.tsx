import { AiOutlineLoading3Quarters } from "@prima/external/react-icon";
import Image from "next/image";

interface LoadingProps {
  title?: string;
}

const Loading = (props: LoadingProps) => {
  return (
    <div className='mx-auto flex flex-col items-center px-3 text-center sm:w-full'>
      <div className='flex items-center justify-center pb-5'>
        <Image
          src='/assets/primathon-logo.png'
          width={180}
          height={44}
          alt='Primathon Logo'
        />
      </div>

      <AiOutlineLoading3Quarters size={80} className='m-4 animate-spin' />

      <p className='text-sm leading-5 py-1 text-gray-500'>
        {props.title || "Loading..."}
      </p>
    </div>
  );
};

export default Loading;
