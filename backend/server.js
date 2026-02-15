const express = require("express");
const { Pool } = require("pg");
const app = express();

require("dotenv").config();

const pool = new Pool({
	host: "db", // 這裡很重要！是 docker service 名稱
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: 5432,
});

app.get("/", async (req, res) => {
	const result = await pool.query("SELECT NOW()");
	res.json(result.rows);
});

app.listen(5000, () => {
	console.log("Server running on port 5000");
});
