//import
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

//config
dotenv.config();
const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;
router.use(express.json());

//register
router.post("/login", async (req, res) => {
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

//export
export default router;
