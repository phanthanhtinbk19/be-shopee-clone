import argon2 from "argon2";
import db from "../models/index.js";
import {genrateRefreshToken, genrateToken} from "../config/jwt.js";
const registerUser = async (req, res) => {
	const {password, email, userName} = req.body;
	try {
		let user = await db.User.findOne({
			where: {
				email: email,
			},
		});
		if (user) {
			return res.status(422).json({
				message: "Lỗi",
				data: {
					email: "Email đã tồn tại",
				},
			});
		}

		// hash password
		const hashedPassword = await argon2.hash(password);

		const newUser = await db.User.create({
			...req.body,
			password: hashedPassword,
		});

		return res.status(200).json({
			message: "Đăng ký thành công",
			data: {
				user: newUser,
			},
		});
	} catch (error) {
		return res.status(500).json(error);
	}
};
let refreshTokens = [];
const loginUser = async (req, res) => {
	try {
		const user = await db.User.findOne({
			where: {
				email: req.body.email,
			},
		});

		if (!user) {
			return res.status(422).json({
				message: "Lỗi",
				data: {
					email: "Email không tồn tại",
				},
			});
		}
		// Check for correct password
		const hashedPassword = await argon2.verify(
			user.password,
			req.body.password
		);

		if (!hashedPassword) {
			return res.status(422).json({
				message: "Lỗi",
				data: {
					password: "Mật khẩu không chính xác",
				},
			});
		}

		const {password, ...info} = user;

		const accessToken = genrateToken(user);

		const refreshToken = genrateRefreshToken(user);

		refreshTokens.push(refreshToken);

		return res.status(200).json({
			message: "Đăng nhập thành công",
			data: {
				access_token: accessToken,
				expiresIn: "10d",
				user: {...info},
			},
		});
	} catch (error) {
		return res.status(500).json(error);
	}
};
const logoutUser = (req, res) => {
	try {
		refreshTokens = refreshTokens.filter(
			(token) => token !== req.cookies?.refreshToken
		);
		res.clearCookie("refreshToken");
		return res.status(200).json({
			message: "Đăng xuất thành công",
		});
	} catch (error) {
		return res.status(500).json(error);
	}
};

export {registerUser, loginUser, logoutUser};
