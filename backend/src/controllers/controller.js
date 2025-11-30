import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET;
// Getting error when passing variable directly, so using process.env.JWT_SECRET in sign method.

export async function login(req, res) {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email}); 
        if(!user) {
            return res.status(401).json({message:"Invalid Email"});
        }
        const passCheck = await bcrypt.compare(password, user.password) ;
        if (!passCheck) {
            return res.status(401).json({message:"Invalid Password"});
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET, // Using directly to avoid error
            {expiresIn: "1d"}
        );
        return res.json({token});

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({message: 'Server error.'})
    }
}