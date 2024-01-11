import { User } from "../models/user.model.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { asyncHandler } from "../utlis/asynHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, username, password } = req.body;

  // check for empty fields
  if ([username, email, name, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Kindly provide required flieds");
  }

  // check for existing user using User model
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError(409, " User details already exists !");
  }

  const user = await User.create({
    name,
    email,
    username,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken "
  );

  if (!createdUser) {
    throw new ApiError(
      500,
      "Something went wrong while registering the new user !"
    );
  }

  // return response on successfull creation
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registed successfully !"));
});

const loginUser = asyncHandler((req, res) => {
  res.status(200).json({ message: "working good !" });
});

export { registerUser, loginUser };
