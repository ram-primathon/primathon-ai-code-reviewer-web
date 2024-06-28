"use client";

import { IoAddCircleOutline } from "@prima/external/react-icon";
import Header from "./Header";

const RepositoryHeader = () => {
  const onAddRepository = () => {
    console.log("Adding a new repository");
  };
  return (
    <Header
      title='Repositories'
      description='These are all the repositories accessible to CodeRabbit.'
    >
      <button
        onClick={onAddRepository}
        className='shrink-0 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 flex gap-1 items-center'
      >
        <IoAddCircleOutline size={20} />
        <span>Add Repository</span>
      </button>
    </Header>
  );
};

export default RepositoryHeader;
