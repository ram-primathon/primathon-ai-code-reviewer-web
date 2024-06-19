import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "@prima/external/react-icon";
import { GITHUB_OAUTH_URL } from "@prima/constants/Urls";

export default function Login() {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-white'>
      <div className='mx-auto flex flex-col items-center px-3 text-center sm:w-full'>
        <div className='flex items-center justify-center pb-5'>
          <Image
            src='/assets/primathon-logo.png'
            width={180}
            height={44}
            alt='Primathon Logo'
          />
        </div>
        <h1 className='text-center text-2xl font-bold leading-snug tracking-tight'>
          Welcome to PrimathonAiCodeReviewer
        </h1>
        <p className='text-sm leading-5 py-1 text-gray-500'>
          Get a free trial by signing up with a Git provider.
        </p>
        <div className='mt-5 flex flex-col gap-2 sm:gap-3'>
          <Link
            href={GITHUB_OAUTH_URL}
            className='flex items-center justify-center rounded-md px-12 py-2 border'
          >
            <FaGithub size={20} className='mr-2' />
            Signup with GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
