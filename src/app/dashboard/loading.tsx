import { AiOutlineLoading3Quarters } from "@prima/external/react-icon";
import Image from "next/image";

export default function Login() {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-white fixed left-0 right-0 top-0 bottom-0 z-10'>
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
          Setting up your account...
        </p>
      </div>
    </div>
  );
}
