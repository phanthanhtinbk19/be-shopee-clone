import {Op} from "sequelize";
import db from "../models";

const addToCart = async (req, res) => {
	const {buyCount, productId} = req.body;
	try {
		const product = await db.Product.findOne({
			where: {
				id: productId,
			},
		});
		if (!product) {
			return res.status(404).json({
				message: "Sản phẩm không tồn tại",
			});
		}
		// check product exist in cart
		const isExistProduct = await db.Purchase.findOne({
			where: {
				productId: productId,
			},
		});
		if (isExistProduct) {
			const newBuyCount = isExistProduct.buyCount + +buyCount;
			await db.Purchase.update(
				{
					buyCount: newBuyCount,
				},
				{
					where: {
						productId: productId,
					},
				}
			);
			return res.status(200).json({
				message: "Thêm vào giỏ hàng thành công",
				data: isExistProduct,
			});
		}

		const newPurchase = await db.Purchase.create({
			buyCount: buyCount,
			productId: productId,
			price: product.price,
			price_before_discount: product.price_before_discount,
			userId: 1,
			status: -1,
			productId: productId,
		});
		return res.status(200).json({
			message: "Thêm vào giỏ hàng thành công",
			data: newPurchase,
		});
	} catch (error) {}
};
const getAllPurchase = async (req, res) => {
	try {
		const purchases = await db.Purchase.findAll({
			include: [
				{
					model: db.Product,
					as: "productData",
				},
			],
			raw: true,
			nest: true,
		});
		let newPurchases = purchases.map((purchase) => {
			return {
				...purchase,
				productData: {
					...purchase.productData,
					images: JSON.parse(purchase.productData.images),
				},
			};
		});

		return res.status(200).json({
			message: "Lấy danh sách sản phẩm thành công",
			data: newPurchases,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Lấy danh sách sản phẩm thất bại",
			error: error.message,
		});
	}
};

const updatePurchase = async (req, res) => {
	const {productId, buyCount} = req.body;

	try {
		const purchase = await db.Purchase.findOne({
			where: {
				productId: productId,
			},
		});
		if (!purchase) {
			return res.status(404).json({
				message: "Sản phẩm không tồn tại",
			});
		}

		const newPurchase = await db.Purchase.update(
			{
				buyCount: buyCount,
			},
			{
				where: {
					productId: productId,
				},
			}
		);
		return res.status(200).json({
			message: "Cập nhật giỏ hàng thành công",
			data: newPurchase,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Cập nhật giỏ hàng thất bại",
			error: error.message,
		});
	}
};

//delete many purchase with array id
const deleteManyPurchase = async (req, res) => {
	const purchaseIds = req.body;
	try {
		const purchases = await db.Purchase.findAll({
			where: {
				id: {
					[Op.in]: purchaseIds,
				},
			},
		});

		if (purchases.length !== purchaseIds.length) {
			return res.status(404).json({
				message: "Không tìm thấy sản phẩm",
			});
		}
		const newPurchases = await db.Purchase.destroy({
			where: {
				id: purchaseIds,
			},
		});
		return res.status(200).json({
			message: "Xóa sản phẩm thành công",
			data: newPurchases,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Xóa sản phẩm thất bại",
			error: error.message,
		});
	}
};

export {addToCart, getAllPurchase, updatePurchase, deleteManyPurchase};
