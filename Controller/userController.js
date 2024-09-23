const User = require('./../Models/userModels');
const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.signup = async (req, res) => {
    try {
        const { name,role, email, password, confirmPassword } = req.body;
        const newUser = await User.create({
            name,
            role,
            email,
            password,
            confirmPassword
        });

        const token = signToken(newUser._id);

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        });
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({
                status: 'fail',
                message: 'Email already exists'
            });
        } else {
            res.status(400).json({
                status: 'fail',
                message: err.message
            });
        }
    }
    
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide an email and password"
            });
        }
        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(400).json({
                message: "Incorrect email or password"
            });
        }

        const token = signToken(user._id);

     
        res.status(200).json({
            status: "success",
            token,
            data: {
                user
            }
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};






