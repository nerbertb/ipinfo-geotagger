import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;

export async function login(req, res) {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email}); 
        if(!user) {
            return res.status(401).json({message:"Invalid Credentials"});
        }
        const passCheck = await bcrypt.compare(password, user.password) ;
        if (!passCheck) {
            return res.status(401).json({message:"Invalid Credentials"});
        }

        const token = jwt.sign(
            {id: user._id},
            JWT_SECRET,
            {expiresIn: "1d"}
        );
        return res.json({token});

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({message: 'Server error.'})
    }
}