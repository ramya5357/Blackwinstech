// import { User } from "../controllers/user.controller.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { asyncHandler } from "../utlis/asynHandler.js";

const getUser = asyncHandler((req, res) => {
  res.status(200).json({ message: "its working !" });
});

export { getUser };
