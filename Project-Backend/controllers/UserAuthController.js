const User = require('../model/User')
const Helper = require('../helper/Helper')

const UserAuthController = {}

// Register
UserAuthController.register = async (req, res) => {
  try {
    const { name, email, password, mobile ,gender} = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return Helper.response(false, 'User already exists', {}, res, 400)
    }

    const hashedPassword = await Helper.hashPassword(password)
    const newUser = new User({ name, email, password: hashedPassword, mobile,gender })
    await newUser.save()

    Helper.response(true, 'User registered successfully', {}, res, 201)
  } catch (error) {
    Helper.response(false, 'Something went wrong', error, res, 500)
  }
}



// Login
UserAuthController.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return Helper.response(false, 'Invalid email or password', {}, res, 400)
    }

    const isMatch = await Helper.comparePassword(password, user.password)
    if (!isMatch) {
      return Helper.response(false, 'Invalid email or password', {}, res, 400)
    }

    const token = await Helper.generateToken(user._id)

    user.token = token
    await user.save()

    Helper.response(
      true,
      'Login successful',
      user,
      res,
      200
    )
  } catch (error) {
    Helper.response(false, 'Something went wrong', error, res, 500)
  }
}

UserAuthController.getDetailById = async (req, res) => {
  try {
    const { user: userId } = req

    const user = await User.findById(userId).select('-password')

    if (!user) {
      return Helper.response(false, 'User not found', {}, res, 200)
    }

    return Helper.response(true, 'User found', user, res, 200)
  } catch (error) {
    return Helper.response(false, 'Something went wrong', error, res, 500)
  }
}

UserAuthController.uploadImage = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return Helper.response(false, 'No file uploaded', null, res, 400);
    }

    const file = req.files.image;

    const uploadedImage = await Helper.photoUpload(file);

    return Helper.response(true, 'Image uploaded successfully', uploadedImage, res, 200);
  } catch (error) {
    console.error(error); 
    return Helper.response(false, 'Something went wrong', error, res, 500);
  }
};


UserAuthController.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, mobile, gender } = req.body;

    let user = await User.findById(userId);
    if (!user) {
      return Helper.response(false, 'User not found', {}, res, 404);
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return Helper.response(false, 'Email is already in use', {}, res, 400);
      }
      user.email = email;
    }

    if (name) user.name = name;
    if (mobile) user.mobile = mobile;
    if (gender) user.gender = gender;
    await user.save();

    return Helper.response(true, 'Profile updated successfully', user, res, 200);
  } catch (error) {
    console.error(error);
    return Helper.response(false, 'Something went wrong', error, res, 500);
  }
};


UserAuthController.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    // Get user ID from token
    const userId = req.user.id;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return Helper.response(false, 'User not found', {}, res, 404);
    }

    // Verify current password
    const isMatch = await Helper.comparePassword(currentPassword, user.password);
    if (!isMatch) {
      return Helper.response(false, 'Incorrect current password', {}, res, 401);
    }

    // Hash the new password
    const hashedPassword = await Helper.hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    Helper.response(true, 'Password changed successfully', {}, res, 200);
  } catch (error) {
    Helper.response(false, 'Something went wrong', error, res, 500);
  }
};






module.exports = UserAuthController
