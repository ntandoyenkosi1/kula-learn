function admin(req, res, next) {
	if (!req.user.user[0].role.includes("admin"))
		return res.status(403).send({
			ok: false,
			error: "Access denied.",
		});

	next();
}

function instructor(req, res, next) {
	const valid = req.user.user[0].role.includes("instructor");
	const v = req.user.user[0].role.includes("admin");
	if (valid == false && v == false)
		return res.status(403).send({
			ok: false,
			error: "Access denied.",
		});

	next();
}

function student(req, res, next) {
	const valid = req.user.user[0].role.includes("student");
	const v = req.user.user[0].role.includes("admin");
	if (valid == false && v == false)
		return res.status(403).send({
			ok: false,
			error: "Access denied.",
		});

	next();
}

module.exports = { admin, instructor, student };
