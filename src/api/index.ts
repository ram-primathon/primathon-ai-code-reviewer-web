import { User } from "./interface";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getSynchronized = () => {
  return sleep(1000);
};

export const fetchUser = async (token: string): Promise<User> => {
  return { name: "John Doe" };
};
