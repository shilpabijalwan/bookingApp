import { User } from "../models/userModel.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const generateRefreshAndAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generate access and refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res, next) => {
  // get user details from frontend
  // validation
  // check if user already exist
  // check for role
  // create user object -create entry in db
  // remove password and refresh token field from response
  // check for user creation
  //return res

  try {
    const { userName, email, role, password } = req.body;
    // validation
    console.log(role);
    //   const userRole = ["admin", "user", "instructor"].includes(role)
    //     ? role
    //     : "user";
    if (
      [userName, email, role, password].some((field) => {
        return field?.trim() == "";
      })
    ) {
      throw new ApiError(400, "All fields are required");
    }

    // check if user already exist

    //   const user = User.findOne({email}) or
    const existingUser = await User.findOne({
      $or: [{ userName }, { email }],
    });

    console.log(existingUser, "existing");

    if (existingUser) {
      throw new ApiError(
        409,
        "user with this email and userName already exist"
      );
    }

    //   const avatarLocalpath = req.files?.avatar[0]?.path;
    // const avatar= await uploadOnCloudinary(avatarLocalpath)
    const user = await User.create({
      userName,
      email,
      password,
      role,
    });
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(
        500,
        "something went wrong while registering the new user"
      );
    }
    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "user registered successfully"));
  } catch (error) {
    console.log("_____________", error);
    next(error);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  // req =>body
  //  login via email or userName
  // find the user
  // password check
  // access and refresh token
  //send cookie
  const { email, userName, password } = req.body;

  if (!(userName || email)) {
    throw new ApiError(400, "userName and email is required");
  }
  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (!user) {
    throw new ApiError(
      404,
      "No account found with this email address or user name"
    );
  }

  // if user exist and check password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, `Invalid credentials`);
  }
  const { refreshToken, accessToken } = await generateRefreshAndAccessToken(
    user._id
  );

  if (!(user || isPasswordValid)) {
    throw new ApiError(401, `Invalid credentials`);
  }

  const logedInuser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: logedInuser,
          accessToken,
          refreshToken,
        },
        `${user.role} logged in successfully`
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  console.log(req);
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookies("accessToken", options)
    .clearCookies("refreshToken", options)
    .json(new ApiResponse(200, ` logged out`));
});

const getUser = asyncHandler(async (req, res) => {
  // Extract token from cookies or Authorization header
  // const token =
  //   req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];
  // console.log(token);
  // if (!token) {
  //   throw new ApiError(401, "Unauthorized", token);
  // }

  // try {
  //   // Verify the token and get details
  //   const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  //   console.log("Decoded token:", decodedToken);

  //   const userId = decodedToken._id;

  //   // Fetch user data from MongoDB
  //   const user = await User.findById(userId).select("-password");

  //   if (!user) {
  //     throw new ApiError(404, "User not found");
  //   }

  //   // Respond with user data
  //   return res.status(200).json(new ApiResponse(200, user));
  // } catch (error) {
  //   throw new ApiError(401, "Invalid Token");
  // }
  const userId = req.user._id;
  // Fetch user data from MongoDB
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res.status(200).json(new ApiResponse(200, user));
});

export { registerUser, loginUser, logoutUser, getUser };
