export const errorResponse = (error: Error) => {
  console.error(error);
  return {
    success: false,
    message: error.message.split("\n").pop() || "Something went wrong",
  };
};
