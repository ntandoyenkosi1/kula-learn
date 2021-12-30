const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
app.use(cors())
app.use(bodyParser.json())
function generateUUID() { // Public Domain/MIT
    let d = new Date().getTime();//Timestamp
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

app.get("/videos/all", async(_req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.all("SELECT * FROM video", (err, video)=>{
			res.send(video)
		})
		db.close();
	}
	);
});
app.get("/video", async(req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		db.each(`SELECT * FROM video WHERE id="${req.body.id}";`, function (_err, video) {
			res.send(video)
		});
	}
	)
	db.close();
});

app.put("/video", async(req, res) => {
	const db = new sqlite3.Database("database.db");
	db.serialize(function () {
		const id=generateUUID()
		db.run(`INSERT INTO video VALUES ("${id}", "${req.body.language}", "${req.body.title}", "${req.body.shortDescription}", "${req.body.longDescrition}", "${req.body.video}", "${req.body.uploader}", ${req.body.iat})`);
	}
	)
	db.close();
	res.send(req.body)
});
app.delete("/video", async(req, res) => {
	try{
		const db = new sqlite3.Database("database.db");
		db.serialize(function () {
			db.run(`DELETE FROM video WHERE id="${req.body.ID}";`);
		}
		)
		db.close();
		res.sendStatus(200)
	}
	catch{
		res.sendStatus(404)
	}
});
app.listen(4000)
console.log('Server running')