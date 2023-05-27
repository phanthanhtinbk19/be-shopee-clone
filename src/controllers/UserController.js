import db from "../models/index.js";
import argon2 from "argon2";

const getProfile = async (req, res) => {
	try {
		const user = await db.User.findOne({
			where: {
				id: req.user.id,
			},
			attributes: {
				exclude: ["password"],
			},
		});

		if (user) {
			return res.status(200).json({
				message: "Lấy người dùng thành công",
				data: user,
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: "Lấy người dùng thất bại",
			error: error.message,
		});
	}
};
const updateProfile = async (req, res) => {
	try {
		if (req.body.password) {
			req.body.password = await argon2.hash(req.body.password);
		}
		const user = await db.User.findOne({
			where: {
				id: req.user.id,
			},
			raw: false,
		});

		if (user) {
			user.userName = req.body.userName || user.userName;
			user.email = req.body.email || user.email;
			user.address = req.body.address || user.address;
			user.phone = req.body.phone || user.phone;
			user.date_of_birth = req.body.date_of_birth || user.date_of_birth;
			user.avatar = req.body.avatar || user.avatar;

			const updatedUser = await user.save();

			return res.status(200).json({
				message: "Cập nhật thành công",
				data: updatedUser,
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: "Cập nhật thất bại",
			error: error.message,
		});
	}
};

export {getProfile, updateProfile};
