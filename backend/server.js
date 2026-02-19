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
	//console.log("API HITTTT");
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

app.get("/regulation", async (req, res) => {
	const result = await pool.query("SELECT * FROM regulations");
	res.status(200).json(result.rows);
});

app.post("/admin/auth/login", async (req, res) => {
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

app.post("/admin/auth/verify", async (req, res) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		res.status(400);
		res.json({ message: "Token not found." });
		return;
	}

	const token = authHeader.split(" ")[1];

	try {
		const tokenDecoded = jwt.verify(token, SECRET_KEY);
		const result = await pool.query("SELECT * FROM admins WHERE id = $1", [tokenDecoded.id]);
		res.status(200).json({
			message: "Token is ok.",
			userId: tokenDecoded.id,
			account: result.rows[0].account,
			access: result.rows[0].access,
		});
	} catch (err) {
		console.log("Verify Error:", err);
		res.status(401).json({ message: "Token is invalid." });
	}
});

//news edit
app.post("/admin/news/add", async (req, res) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		res.status(400);
		res.json({ message: "Token not found." });
		return;
	}

	const token = authHeader.split(" ")[1];

	try {
		const tokenDecoded = jwt.verify(token, SECRET_KEY);

		const { title, content, date, tag, links } = req.body;

		const result = await pool.query("INSERT INTO news (title, content, date, tag, filelinks) VALUES ($1, $2, $3, $4, $5)", [
			title,
			content,
			date,
			tag,
			links,
		]);

		res.status(200).json({
			message: "News added successfully.",
		});
	} catch (err) {
		console.log("Verify Error:", err);
		res.status(401).json({ message: "Token is invalid." });
	}
});

app.post("/admin/news/update", async (req, res) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		res.status(400);
		res.json({ message: "Token not found." });
		return;
	}

	const token = authHeader.split(" ")[1];

	try {
		const tokenDecoded = jwt.verify(token, SECRET_KEY);

		const { title, content, date, tag, links, id } = req.body;

		const result = await pool.query(
			"UPDATE news SET title = $1, content = $2, date = $3, tag = $4, filelinks = $5, publishDate = CURRENT_DATE WHERE id = $6",
			[title, content, date, tag, links, id],
		);

		res.status(200).json({
			message: "News updated successfully.",
		});
	} catch (err) {
		console.log("Verify Error:", err);
		res.status(401).json({ message: "Token is invalid." });
	}
});

app.post("/admin/news/delete", async (req, res) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		res.status(400);
		res.json({ message: "Token not found." });
		return;
	}

	const token = authHeader.split(" ")[1];

	try {
		const tokenDecoded = jwt.verify(token, SECRET_KEY);

		const { id } = req.body;

		const result = await pool.query("DELETE FROM news WHERE id = $1", [id]);

		res.status(200).json({
			message: "News deleted successfully.",
		});
	} catch (err) {
		console.log("Verify Error:", err);
		res.status(401).json({ message: "Token is invalid." });
	}
});

//regulation edit
app.post("/admin/regulation/add", async (req, res) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		res.status(400);
		res.json({ message: "Token not found." });
		return;
	}

	const token = authHeader.split(" ")[1];

	try {
		const tokenDecoded = jwt.verify(token, SECRET_KEY);

		const { tag, fileName, docLink } = req.body;

		const result = await pool.query("INSERT INTO regulations (tag, fileName, docLink) VALUES ($1, $2, $3)", [tag, fileName, docLink]);

		res.status(200).json({
			message: "Regulation added successfully.",
		});
	} catch (err) {
		console.log("Verify Error:", err);
		res.status(401).json({ message: "Token is invalid." });
	}
});

app.post("/admin/regulation/update", async (req, res) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		res.status(400);
		res.json({ message: "Token not found." });
		return;
	}

	const token = authHeader.split(" ")[1];

	try {
		const tokenDecoded = jwt.verify(token, SECRET_KEY);

		const { tag, fileName, docLink, id } = req.body;

		const result = await pool.query("UPDATE regulations SET tag = $1, fileName = $2, docLink = $3, date = CURRENT_DATE WHERE id = $4", [
			tag,
			fileName,
			docLink,
			id,
		]);

		res.status(200).json({
			message: "Regulation updated successfully.",
		});
	} catch (err) {
		console.log("Verify Error:", err);
		res.status(401).json({ message: "Token is invalid." });
	}
});

app.post("/admin/regulation/delete", async (req, res) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		res.status(400);
		res.json({ message: "Token not found." });
		return;
	}

	const token = authHeader.split(" ")[1];

	try {
		const tokenDecoded = jwt.verify(token, SECRET_KEY);

		const { id } = req.body;

		const result = await pool.query("DELETE FROM regulations WHERE id = $1", [id]);

		res.status(200).json({
			message: "Regulation deleted successfully.",
		});
	} catch (err) {
		console.log("Verify Error:", err);
		res.status(401).json({ message: "Token is invalid." });
	}
});

app.listen(5000, () => {
	console.log("Server running on port 5000");
});
