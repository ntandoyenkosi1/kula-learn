const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv");
const app = express();
const { admin, instructor, student } = require("./middleware/roles");
const auth = require("./middleware/auth");
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 4000;
function generateUUID() {
	// Public Domain/MIT
	let d = new Date().getTime(); //Timestamp
	let d2 =
		(typeof performance !== "undefined" &&
			performance.now &&
			performance.now() * 1000) ||
		0; //Time in microseconds since page-load or 0 if unsupported
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
		/[xy]/g,
		function (c) {
			let r = Math.random() * 16; //random number between 0 and 16
			if (d > 0) {
				//Use timestamp until depleted
				r = (d + r) % 16 | 0;
				d = Math.floor(d / 16);
			} else {
				//Use microseconds since page-load if supported
				r = (d2 + r) % 16 | 0;
				d2 = Math.floor(d2 / 16);
			}
			return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
		}
	);
}
async function encryptPassword(password) {
	// Hash the password
	const salt = await bcrypt.genSalt(15);
	const pw = await bcrypt.hash(password, salt);
	return pw;
}
// Insert course
app.post("/course", [auth, instructor], async (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		const id = generateUUID();
		const iat = Math.round(new Date().getTime() / 1000);
		db.run(
			`INSERT INTO course VALUES ("${id}", "${req.body.collectionID}", "${req.body.title}", "${req.body.description}", "${req.body.image}", ${iat}, "${req.body.uploader}", "${req.body.published}", "${req.body.visibility}")`
		);
	});
	db.close();
	res.send(req.body);
});
//GET All courses
app.get("/courses/", [auth, student], async (_req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all("SELECT * FROM course;", (_err, video) => {
			res.send(video);
		});
		db.close();
	});
});
//GET 1 course by ID
app.post("/api/course", async (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all(
			`SELECT * FROM course WHERE ID="${req.body.id}";`,
			(_err, video) => {
				res.send(video);
			}
		);
		db.close();
	});
});
// Get 1 course by collectionID
app.post("/api/course/get", [auth, student], (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all(
			`SELECT * FROM course WHERE collectionID="${req.body.id}";`,
			(err, respo) => {
				res.send(respo);
			}
		);
	});
	db.close();
});
//Update course
app.put("/api/course", [auth, instructor], async (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.run(
			`UPDATE course SET title="${req.body.title}", shortDescription="${req.body.shortDescription}", imageUrl="${req.body.image}" WHERE ID="${req.body.id}";`
		);
	});
	db.close();
	res.send(req.body);
});
//DELETE course
app.delete("/courses/", [auth, instructor], async (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all(`DELETE FROM course where ID="${req.body.id}"`, (_err) => {
			//
		});
		db.all(
			`DELETE FROM module where collectionID="${req.body.collectionID}"`,
			(_err, video) => {
				res.send(video);
			}
		);
		db.close();
	});
});
//Insert modules
app.post("/module", [auth, instructor], async (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		const id = generateUUID();
		const uploader = "s.ntando99@gmail.com";
		const iat = Math.round(new Date().getTime() / 1000);
		db.run(
			`INSERT INTO module VALUES ("${id}", "${req.body.collectionID}", "${req.body.language}", "${req.body.title}", "${req.body.shortDescription}", "${req.body.longDescription}", "${req.body.video}", "${uploader}", ${iat})`
		);
	});
	db.close();
	res.send(req.body);
});
//Get modules
app.post("/modules", [auth, student], async (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all(
			`SELECT * FROM module WHERE collectionID="${req.body.id}";`,
			function (_err, video) {
				res.send(video);
			}
		);
	});
	db.close();
});
// delete module
app.delete("/api/module", [auth, instructor], async (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all(
			`DELETE FROM module WHERE ID="${req.body.id}";`,
			function (_err, video) {
				res.send(video);
			}
		);
	});
	db.close();
});
//Update module
app.put("/modules", [auth, instructor], async (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all(
			`UPDATE FROM module SET title=${req.body.title} shortDescription=${req.body.shortDescription} longDescription=${req.body.longDescription} WHERE collectionID="${req.body.id}";`,
			function (_err, video) {
				res.send(video);
			}
		);
	});
	db.close();
});
// delete module
app.delete("/courses", [auth, instructor], async (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all(
			`DELETE FROM module WHERE collectionID="${req.body.id}";`,
			function (_err, video) {
				res.send(video);
			}
		);
	});
	db.close();
});
app.post("/api/user", async (req, res) => {
	const db = new sqlite3.Database("database.db");
	const password = await encryptPassword(req.body.password);
	db.serialize(async function () {
		const id = generateUUID();
		const iat = Math.round(new Date().getTime() / 1000);
		const picture = "https://i.ibb.co/mNLsKXN/user.png";
		db.run(
			`INSERT INTO users VALUES ("${id}", "${req.body.firstName}", "${req.body.lastName}", "${req.body.email}", "${password}", "${req.body.role}", ${iat}, "false", "${picture}")`
		);
	});
	db.close();
	res.send(req.body);
});
app.post("/api/user/get", (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(async function () {
		db.all(
			`SELECT * FROM users WHERE email="${req.body.email}";`,
			async function (_err, respo) {
				try {
					const valid = await bcrypt.compare(
						req.body.password,
						respo[0].password
					);
					if (!valid) {
						res.sendStatus(404);
					} else {
						const token = jwt.sign(
							{
								id: respo.ID,
								roles: respo.role,
								user: respo,
							},
							"ad5a47fc-5827-4908-8799-8a0130f4dc0e",
							{ expiresIn: "720m" }
						);

						res.send({
							ok: true,
							token: token,
							user: respo,
						});
					}
				} catch {
					res.send(404);
					return;
				}
			}
		);
	});
	db.close();
});
app.post("/api/enrol", [auth, student], (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		const id = generateUUID();
		const iat = Math.round(new Date().getTime() / 1000);
		progress = 0;
		db.run(
			`INSERT INTO userCourse VALUES ("${id}", "${req.body.userID}", "${req.body.courseID}", "${progress}", ${iat})`
		);
	});
	db.close();
	res.send(req.body);
});
app.delete("/api/enrol", [auth, student], (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		progress = 0;
		db.run(
			`DELETE FROM userCourse WHERE userID="${req.body.userID}" AND courseID="${req.body.courseID}";`
		);
	});
	db.close();
	res.send(req.body);
});
app.put("/api/enrol", [auth, student], (req, res) => {
	const db = new sqlite3.Database("database.db");
	list = [];
	db.serialize(function () {
		db.each(
			`SELECT * FROM userCourse  WHERE userID="${req.body.userID}";`,
			(err, rs) => {
				list.push(rs.courseID);
			}
		);
		db.all(
			`SELECT * FROM course where collectionID="c9baa837-b503-4a08-804b-b318ad7ee7d7"`,
			() => {
				res.send(list);
			}
		);
	});
	db.close();
});
// ****************Users********************** //
app.get("/users", [auth, instructor], (err, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all(`SELECT * FROM users";`, (_er, rs) => {
			res.send(rs);
		});
	});
	db.close();
});
app.post("/api/user/instructor", [auth, instructor], (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all(
			`SELECT * FROM course WHERE uploader="${req.body.uploader}";`,
			(_er, rs) => {
				res.send(rs);
			}
		);
	});
	db.close();
});
app.get("/api/admin/students", [auth, instructor], (_req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all(`SELECT * FROM users WHERE role="student";`, (_er, rs) => {
			res.send(rs);
		});
	});
	db.close();
});
app.get("/api/admin/instructors", [auth, admin], (_req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all(`SELECT * FROM users WHERE role="instructor";`, (_er, rs) => {
			res.send(rs);
		});
	});
	db.close();
});
app.get("/api/admin/administrators", [auth, admin], (_req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all(`SELECT * FROM users WHERE role="admin";`, (_er, rs) => {
			res.send(rs);
		});
	});
	db.close();
});
app.get("/api/admin/courses", [auth, admin], (_req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all(`SELECT * FROM course";`, (_er, rs) => {
			res.send(rs);
		});
	});
	db.close();
});
app.put("/auth/roles", [auth, admin], (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.run(
			`UPDATE users SET role="${req.body.role}" WHERE ID="${req.body.ID}";`
		);
	});
	db.close();
	res.send(req.body);
});
app.put("/auth/users", [auth, admin], (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.run(
			`UPDATE users SET disabled="${req.body.disabled}" WHERE ID="${req.body.ID}";`
		);
	});
	db.close();
	res.send(req.body);
});
app.put("/courses/publish", [auth, instructor], (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.run(
			`UPDATE course SET published="${req.body.published}" WHERE ID="${req.body.ID}";`
		);
	});
	db.close();
	res.send(req.body);
});
app.post("/courses/enrolled", [auth, instructor], (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all(
			`SELECT COUNT(userID) FROM userCourse WHERE courseID="${req.body.courseID}";`,
			(_err, respo) => {
				res.send(respo);
			}
		);
	});
	db.close();
});
app.put("/courses/enable", [auth, instructor], (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.run(
			`UPDATE course SET visibility="${req.body.visibility}" WHERE ID="${req.body.ID}";`
		);
	});
	db.close();
	res.send(req.body);
});
app.post("/courses/check", [auth, instructor], (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all(
			`SELECT * FROM userCourse WHERE userID="${req.body.ID}" AND  courseID="${req.body.courseID}"`,
			(_err, resp) => {
				if (resp[0]) {
					res.send(true);
				} else {
					res.send(false);
				}
			}
		);
	});
	db.close();
});
app.put("/api/user", [auth, student], async (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(async function () {
		db.run(`UPDATE users SET picture="${req.body.picture}"`);
	});
	db.close();
	res.send(req.body);
});
http.createServer(app).listen(PORT);
console.log("Server running on PORT " + PORT);
