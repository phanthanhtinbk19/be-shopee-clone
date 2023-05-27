import db from "../models";

const createProduct = async (req, res) => {
	try {
		const savedProduct = await db.Product.create({
			...req.body,
			images: JSON.stringify(req.body.images),
		});
		return res.status(200).json({
			message: "Tạo sản phẩm thành công",
			data: savedProduct,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Tạo sản phẩm thất bại",
			error: error.message,
		});
	}
};
const getAllProduct = async (req, res) => {
	const {order, sort_by, category, name} = req.query;
	const whereClause = {};

	if (category !== undefined) {
		whereClause.categoryId = category;
	}

	if (name !== undefined) {
		whereClause.name = name;
	}
	try {
		const page = Number(req.query.page) * 1 || 1;
		const limit = Number(req.query.limit) * 1 || 10;

		const products = await db.Product.findAll({
			where: whereClause,
			offset: (page - 1) * limit,
			limit: +limit,
			order: [[sort_by || "createdAt", order || "DESC"]],
			include: [
				{
					model: db.Category,
					as: "categoryData",
					attributes: ["id", "name"],
				},
			],
			raw: true,
			nest: true,
		});
		const totalProducts = await db.Product.count();
		const productsPerPage = limit;
		const totalPages = Math.ceil(totalProducts / productsPerPage);

		//pagination

		let newProducts = products.map((product) => {
			return {
				...product,
				images: JSON.parse(product.images),
			};
		});

		return res.status(200).json({
			message: "Lấy danh sách sản phẩm thành công",
			data: {
				products: newProducts,
				pagination: {
					page: page || 1,
					limit: productsPerPage,
					page_size: totalPages,
				},
			},
		});
	} catch (error) {
		return res.status(500).json({
			message: "Lấy danh sách sản phẩm thất bại",
			error: error.message,
		});
	}
};

const getProductById = async (req, res) => {
	const {id} = req.params;
	try {
		const product = await db.Product.findOne({
			where: {id},
			include: [
				{
					model: db.Category,
					as: "categoryData",
					attributes: ["id", "name"],
				},
			],
			raw: true,
			nest: true,
		});
		let newProducts = {
			...product,
			images: JSON.parse(product.images),
		};
		if (!product) {
			return res.status(404).json({
				message: "Không tìm thấy sản phẩm",
			});
		}

		return res.status(200).json({
			message: "Lấy sản phẩm thành công",
			data: newProducts,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Lấy sản phẩm thất bại",
			error: error.message,
		});
	}
};
export {createProduct, getAllProduct, getProductById};
