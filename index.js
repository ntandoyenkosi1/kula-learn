const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
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
app.put("/course", async (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		const id = generateUUID();
		const iat = Math.round(new Date().getTime() / 1000);
		db.run(
			`INSERT INTO course VALUES ("${id}", "${req.body.collectionID}", "${req.body.title}", "${req.body.description}", "${req.body.image}", ${iat})`
		);
	});
	db.close();
	res.send(req.body);
});

app.post("/module", async (req, res) => {
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
app.get("/courses/", async (_req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all("SELECT * FROM course", (_err, video) => {
			res.send(video);
		});
		db.close();
	});
});
app.post("/modules", async (req, res) => {
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
app.listen(4000);
console.log("Server running");