import express from "express";
import authRoutes from "./routes/auth.routes.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import { setupSocket } from "./sockets/socket.js";
import messageRoutes from "./routes/messages.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
const app = express();
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());



app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (_, res) => {
  res.send("Server is running!");
});
app.get("/me", authMiddleware, (req, res) => {
  res.json({
    id: req.userId,
  });
});

const PORT = process.env.PORT || 3000;


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

setupSocket(io);

server.listen(PORT, () => {
  console.log(` Server running on ${PORT}`);
});