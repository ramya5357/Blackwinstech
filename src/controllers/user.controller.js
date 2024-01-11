import { User } from "../models/user.model.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { asyncHandler } from "../utlis/asynHandler.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken; // add refresh token to user in db
    await user.save({ validateBeforeSave: false }); // save there but don't require password

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access & refresh tokens"
    );
  }
};

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

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    throw new ApiError(400, "Username is required !");
  }

  const user = await User.findOne({
    username,
  });

  //check if user exists
  if (!user) {
    throw new ApiError(404, "User doesn't exists !");
  }

  //check if password is entered
  if (!password) {
    throw new ApiError(400, "Password is required !");
  }

  //check if password is valid
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials !");
  }

  // invoke function to generate tokens and returns them
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  // creted a new frame of user details with updated refresh tokens bcz in user it will be "" and these will be returned as data to user.
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken "
  );

  // cookie options defined
  const options = {
    httpOnly: true,
    secure: true,
  };

  // returning access token in secure cookie
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
        },
        "User logged in Successfully !"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    await req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  // cookie options defined
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully !"));
});

const userInfo = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, req.user, "Current user fetched successfully !")
    );
});

export { registerUser, loginUser, logoutUser, userInfo };
