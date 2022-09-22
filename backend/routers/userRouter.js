import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel';
import { generateToken } from '../utils';

const userRouter = express.Router();

/**
 * register
 */

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      country: req.body.country,
      password: req.body.password,
    });
    const createdUser = await user.save();
    if (!createdUser) {
      res.status(401).send({
        message: 'Wrong inputs',
      });
    } else {
      res.send({
        _id: createdUser._id,
        userName: createdUser.userName,
        email: createdUser.email,
        country: createdUser.country,
        password: createdUser.password,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
      });
    }
  }),
);

/**
 * login
 */

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const singninUser = await User.findOne({
      userName: req.body.userName,
      password: req.body.password,
    });
    if (!singninUser) {
      res.status(401).send({
        message: 'Wrong username or password',
      });
    } else {
      res.send({
        _id: singninUser._id,
        userName: singninUser.userName,
        country: singninUser.country,
        isAdmin: singninUser.isAdmin,
        token: generateToken(singninUser),
      });
    }
  }),
);

/**
 * get users
 */
userRouter.get(
  '/all',
  expressAsyncHandler(async (req, res) => {
    const data = await User.find({});
    res.send(data);
  }),
);

/**
 * get user
 */
userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status.apply(404).send({ message: 'user not found' });
    }
  }),
);

/**
 * set new highest score
 */
userRouter.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(401).send({
        message: 'user not found',
      });
    } else {
      user.highestScore = req.body.newRecord;
      const updatedUser = await user.save();
      res.send({
        highestScore: updatedUser.highestScore,
      });
    }
  }),
);

export default userRouter;
