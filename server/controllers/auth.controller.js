import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import crypto from "crypto";
import jsonwebtoken from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

dotenv.config();

export const signup = async (req, res) => {
    try {
        const {fullName, username, email, password} = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({error: "Invalid email format"});
        }

        const existingUser = await User.findOne({ username })
        if(existingUser) {
            return res.status(400).json({ error: "Username is already taken "})
        }

        const existingEmail = await User.findOne({ email })
        if(existingEmail) {
            return res.status(400).json({ error: "Email is already taken "})
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

        if(!passwordRegex.test(password)) {
            return res.status(400).json({ error: "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number" });
        }

        // hash password
        // 123456 -> aooiwjdo@_AWD!@__ASD>A??^!@(#j
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
        });

        if(newUser) {

            await newUser.save();
            
            // send confirmation email

            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
                isVerified: newUser.isVerified,
            });

        } else {
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error:"Invalid username or password"})
        }
        
        if(!user.isVerified) {
            return res.status(400).json({ error: "Please verify your email to login" });
        }

        else {
            generateTokenAndSetCookie(user._id, res);
            user.lastLogin = new Date();
            res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                followers: user.followers,
                following: user.following,
                profileImg: user.profileImg,
                coverImg: user.coverImg,
                isVerified: user.isVerified,
                lastLogin: user.lastLogin,
            });
        }
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch {
        console.log("Error in getMe controller", error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const sendConfirmationMail = async (req, res) => {
	const { email } = req.body;

    // get user fullname

    const user = await User.findOne({ email });

    if(!user) {
        return res.status(404).json({ error: "User not found" });
    }


	if (!email) {
		return res.status(400).json({ message: "Email is required" });
	}

	// Generate a 6-digit OTP
	const otp = crypto.randomInt(100000, 999999).toString();

	// Configure the email transport using nodemailer
	const transporter = nodemailer.createTransport({
		service: "gmail", // Use your email service
		auth: {
			user: process.env.EMAIL_USER, // Replace with your email
			pass: process.env.EMAIL_PASSWORD, // Replace with your email password
		},
	});

	const mailOptions = {
		from: "AAP", 
		to: email,
		subject: "Verification of Your Account Deletion Request",
		html: `
            <h2> Dear ${user.fullName} </h2>
            <p> We have received your request to delete your account on AAP </p>
            <p> To confirm that this request is coming from you and to proceed with the deletion of your account, please enter the following One-Time Password (OTP) into the designated field on our website: </p>
            <div style="text-align: center;">
                <h2> ${otp} </h2>
            </div>
            <p style="font-weight: bold;"> Please note that once your account is deleted, all associated data, including but not limited to: </p>
            <ul>
                <li>
                    Your personal information
                </li>
                <li>
                    Your saved preferences
                </li>
                <li>
                    Your purchase history
                </li>
            </ul>
            <p style="font-weight: bold;"> will be permanently removed from our servers and cannot be recovered. </p>
            <p> If you did not request to delete your account, please ignore this email. </p>
        `,
	};

	try {
		await transporter.sendMail(mailOptions);
		res.status(200).json({ message: "OTP sent successfully", otp });
	} catch (error) {
		res.status(500).json({ message: "Failed to send OTP", error });
	}
};

export const sendConfirmationToken = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if(!user) {
        return res.status(404).json({ error: "User not found" });
    }

    try {
		const token = jsonwebtoken.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "1d",
		});

		const user = await User.findOneAndUpdate(
			{ email },
			{ confirmationToken: token },
		);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const confirmationLink = `${process.env.CLIENT_URL}/verified/${token}`;

		// Configure the email transport using nodemailer
		const transporter = nodemailer.createTransport({
			service: "gmail", // Use your email service
			auth: {
				user: process.env.EMAIL_USER, // Replace with your email
				pass: process.env.EMAIL_PASSWORD, // Replace with your email password
			},
		});

		const mailOptions = {
			from: "AAP",
			to: email,
			subject: "Welcome to the AAP",
			html: `
                <h2> Dear ${user.fullName} </h2>
                <p> We're excited to have you join us. To complete your registration, please click on the link below to verify your email address: </p>
                <h4> ${confirmationLink} </h4>
                <p> Once verified, you'll have access to all of our amazing features. </p>
                <p> Thanks for joining our showroom, as well as our community. </p>
            `,
		};

		await transporter.sendMail(mailOptions);

		res.status(200).json({ message: "Confirmation email sent" });
	} catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const confirmEmail = async (req, res) => {
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;

        const user = await User.findOne({ email });

        // res.status(200).json({decoded, email, user});

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.isVerified = true;

        generateTokenAndSetCookie(user._id, res);

        await user.save();
        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
}