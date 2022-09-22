import jwt from 'jsonwebtoken';
import config from './config';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      userName: user.firstName,
      email: user.email,
      country: user.country,
      password: user.country,
      highestScore: user.highestScore,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
  );
};
