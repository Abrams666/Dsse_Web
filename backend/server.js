//import
import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Pool } from "pg";

//config
dotenv.config();
const app = express();
app.use(express.json());
const SECRET_KEY = process.env.JWT_SECRET;

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

app.post("/admin/auth/login", async (req, res) => {
	console.log(req.body);
	const { account, pwd } = req.body;

	const result = await pool.query("SELECT id FROM admins WHERE account = $1 AND password = $2", [account, pwd]);

	if (result.rowCount == 0) {
		res.status(401);
		res.json({ message: "Account or password is wrong." });
		return;
	} else {
		const token = jwt.sign({ id: result.rows[0].id }, SECRET_KEY, { expiresIn: "1h" });
		res.status(200);
		res.json({ message: "Succeed.", token });
	}
});

app.listen(5000, () => {
	console.log("Server running on port 5000");
});
