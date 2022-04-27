export const errorHandler = async (req: any, res: any) => {
  const error = req.error;
  console.log(">>>>>>Error Handler");
  console.log(req.error);
  res
    .status(error?.status || 500)
    .send({ message: error?.message || "Encountered an unknown error." });
};
