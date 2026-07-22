import express from "express";
import authRoutes from "./routes/auth.routes.js";
import "dotenv/config";
const app = express();
app.use(express.json());
app.get("/", (_, res) => {
    res.send("Server is running!");
});
app.use("/api/auth", authRoutes);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
