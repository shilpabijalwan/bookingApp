import { User } from "../models/userModel.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateRefreshAndAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken;
    const refreshToken = user.generateRefreshToken;

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
    throw new ApiError(401, `Incorrect password`);
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

export { registerUser, loginUser, logoutUser };
