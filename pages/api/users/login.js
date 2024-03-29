import nc from 'next-connect';
import bcyrpt from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';


const handler = nc();
handler.post(async (req, res) => {
    await db.connect();
    const user = await User.findOne({ email: req.body.email});
    await db.disconnect();
    if (user && bcyrpt.compareSync(req.body.password, user.password)) {
        const token = signToken(user);
        user.password = ''
        res.send({ 
            token,
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isVendor: user.isVendor
        })
    } else {
        res.status(401).send({ message: 'Invalid email or password'});
    }
});

export default handler;