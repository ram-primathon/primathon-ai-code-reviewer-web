const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getSynchronized = () => {
  return sleep(1000);
};
