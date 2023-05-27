import jwt from "jsonwebtoken";
const verifyToken = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
			if (err)
				return res.status(403).json({
					message: "Token hết hạn",
				});

			req.user = user;
			next();
		});
	} else {
		return res.status(401).json({
			message: "You are not authenticated!",
		});
	}
};

const verifyTokenAndAuthorization = async (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			return res.status(403).json("You are not allowed to do that!");
		}
	});
};
const verifyTokenAndAdmin = async (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next();
		} else {
			return res.status(403).json("You are not allowed to do that!");
		}
	});
};
export {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};
