import jwt from "jsonwebtoken";
const genrateToken = (user) => {
	return jwt.sign(
		{id: user.id, roles: user.roles},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: "1d",
		}
	);
};
const genrateRefreshToken = (user) => {
	return jwt.sign(
		{id: user.id, roles: user.roles},
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: "17d",
		}
	);
};
export {genrateToken, genrateRefreshToken};
