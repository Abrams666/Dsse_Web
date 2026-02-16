const express = require("express");
const { Pool } = require("pg");
const app = express();

require("dotenv").config();

const pool = new Pool({
	host: "db",
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: 5432,
});

app.get("/", async (req, res) => {
	const result = await pool.query("SELECT NOW()");
	res.json(result.rows);
});

app.get("/news/:num/:cat", async (req, res) => {
	console.log("API HITTTT");
	const newsNum = Number(req.params.num);
	const catalog = String(req.params.cat);
	let conditions = "";

	if (catalog == "all") {
		const result = await pool.query("SELECT * FROM news ORDER BY id DESC LIMIT $1", [newsNum]);
		res.json(result.rows);
	} else {
		for (let i = 0; i < catalog.length; i++) {
			if (i != 0) {
				conditions += " OR ";
			}
			conditions += `tag = ${String(catalog[i])}`;
		}

		const result = await pool.query(`SELECT * FROM news WHERE ${conditions} ORDER BY id DESC LIMIT $1`, [newsNum]);
		res.status(200).json(result.rows);
	}
});

app.get("/news/:id/", async (req, res) => {
	const id = Number(req.params.id);

	const result = await pool.query("SELECT * FROM news WHERE id = $1", [id]);
	res.status(200).json(result.rows);
});

app.listen(5000, () => {
	console.log("Server running on port 5000");
});
