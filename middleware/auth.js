// Import dependencies
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token)
		return res.status(401).send({
			ok: false,
			error: "Access denied. No token provided",
		});

	try {
		const s = "ad5a47fc-5827-4908-8799-8a0130f4dc0e";
		const decoded = jwt.verify(token, s);
		//console.log(decoded)
		req.user = decoded;
	} catch (error) {
		return res.status(401).send({
			ok: false,
			error: "Token expired",
		});
	}

	next();
};