const AsyncHandler =
  (fn: any) =>
  async (...args: any) => {
    const fnReturn = fn(...args);
    const next = args[args.length - 1];
    return Promise.resolve(fnReturn).catch((error) => {
      console.error('Error caught by AsyncHandler:', error);
      next(error);
    });
  };

export default AsyncHandler