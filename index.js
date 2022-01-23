const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");
const https = require('https')
const http = require('http')
const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 4000
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
// Insert course
app.post("/course", async (req, res) => {
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
//GET All courses
app.get("/courses/", async (_req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all("SELECT * FROM course;", (_err, video) => {
			res.send(video);
		});
		db.close();
	});
});
//GET 1 course by
app.post("/api/course", async (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all(`SELECT * FROM course WHERE ID="${req.body.id}";`, (_err, video) => {
			res.send(video);
		});
		db.close();
	});
});
// Get 1 course by collectionID
app.post("/api/course/get", (req, res)=>{
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all(
			`SELECT * FROM course WHERE collectionID="${req.body.id}";`, (err, respo)=>{
				res.send(respo)
			}
		);
	});
	db.close();
})
//Update course
app.put("/api/course", async (req, res) => {
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
app.delete("/courses/", async (req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all(`DELETE FROM course where ID="${req.body.id}"`, (_err, video) => {
			//console.log(0)
		});
		db.all(`DELETE FROM module where collectionID="${req.body.collectionID}"`, (_err, video) => {
			res.send(video);
		});
		db.close();
	});
});
//Insert modules
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
//Get modules
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
// delete module
app.delete("/api/module", async (req, res) => {
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
app.put("/modules", async (req, res) => {
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
app.delete("/courses", async (req, res) => {
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
app.post("/api/user", (req, res)=>{
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		const id = generateUUID();
		const iat = Math.round(new Date().getTime() / 1000);
		db.run(
			`INSERT INTO users VALUES ("${id}", "${req.body.firstName}", "${req.body.lastName}", "${req.body.email}", "${req.body.password}","student", ${iat})`
		);
	});
	db.close();
	res.send(req.body);
})
app.post("/api/user/get", (req, res)=>{
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all(
			`SELECT ID,firstName, lastName, email, createdAt, role FROM users WHERE email="${req.body.email}";`,
			function (_err, video) {
				res.send(video);
			}
		);
	});
	db.close();
})
app.post("/api/enrol", (req, res)=>{
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		const id = generateUUID();
		const iat = Math.round(new Date().getTime() / 1000);
		progress=0
		db.run(
			`INSERT INTO userCourse VALUES ("${id}", "${req.body.userID}", "${req.body.courseID}", "${progress}", ${iat})`
		);
	});
	db.close();
	res.send(req.body);
})
app.put("/api/enrol", (req, res)=>{
	const db = new sqlite3.Database("database.db");
	list=[]
	list1=[]
	id=""
	db.serialize(function () {
		db.each(
			`SELECT * FROM userCourse  WHERE userID="${req.body.userID}";`, (err, rs)=>{
				list.push(rs.courseID)
			}
		)
		db.all(`SELECT * FROM course where collectionID="c9baa837-b503-4a08-804b-b318ad7ee7d7"`, (e, r)=>{
			//list.push(r)
			res.send(list)
		})
		// for(var i=0;i<list.length;i++){
		// 	db.each(`SELECT * FROM course WHERE collectionID="${list[i]}";`, (error, respo)=>{
		// 		list1.push(respo)
		// 	})
		// }
		// db.all(`SELECT * FROM course where collectionID="c9baa837-b503-4a08-804b-b318ad7ee7d7"`, (e, r)=>{
		// 	console.log(list1)
		// })
		//console.log(list);
	});
	//res.sendStatus(200)
	db.close();
})
http.createServer(app).listen(PORT)
console.log("Server running on PORT "+PORT);