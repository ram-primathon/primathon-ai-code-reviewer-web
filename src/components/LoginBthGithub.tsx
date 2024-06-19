"use client";

import { FaGithub } from "@prima/external/react-icon";

const LoginBthGithub = () => {
  const onLogin = () => {
    console.log("Login with GitHub");
  };
  return (
    <button
      className='flex items-center justify-center rounded-md px-12 py-2 border'
      onClick={onLogin}
    >
      <FaGithub size={20} className='mr-2' />
      Signup with GitHub
    </button>
  );
};

export default LoginBthGithub;
