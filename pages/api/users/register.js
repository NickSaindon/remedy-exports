import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    companyName: req.body.companyName,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
    isVendor: false,
  });
  const user = await newUser.save();
  await db.disconnect();

  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    companyName: user.companyName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    isAdmin: user.isAdmin,
    isVendor: user.isVendor,
  });
});

export default handler;