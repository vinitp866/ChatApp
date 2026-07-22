import { io } from "socket.io-client";
import readline from "readline";

const token = process.argv[2];
const receiverId = process.argv[3];

const socket = io("http://localhost:3000", {
  auth: {
    token,
  },
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);
  console.log("Type a message and press Enter.");
});

socket.on("receive-message", (message) => {
  console.log("\n📩 Received:", message);
});

socket.on("message-sent", (message) => {
  console.log("\n✅ Sent:", message);
});

socket.on("connect_error", (err) => {
  console.log("❌", err.message);
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});

rl.on("line", (input) => {
  socket.emit("send-message", {
    receiverId,
    content: input,
  });
});