import Link from "next/link";

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center p-24'>
      <Link
        href='/login'
        className='flex gap-2 items-center px-12 py-3 text-white font-bold bg-red-500 hover:bg-red-500 rounded-full'
      >
        Get Started
      </Link>
    </main>
  );
}
