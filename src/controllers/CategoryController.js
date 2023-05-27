import db from "../models";

const createCategory = async (req, res) => {
	try {
		const newCategory = await db.Category.create(req.body);
		return res.status(200).json({
			message: "Tạo danh mục thành công",
			data: newCategory,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Tạo danh mục thất bại",
			error: error.message,
		});
	}
};
const getAllCategory = async (req, res) => {
	try {
		const categories = await db.Category.findAll();
		return res.status(200).json({
			message: "Lấy danh sách danh mục thành công",
			data: categories,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Lấy danh sách danh mục thất bại",

			error: error.message,
		});
	}
};
export {createCategory, getAllCategory};
