const express = require("express");
const cors = require("cors");

const postsRouter = require("./router");

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/posts", postsRouter);

server.get("/", (req, res) => res.send("API up and running!"));

const port = process.env.PORT || 6000;
server.listen(port, () => console.log(`server running on port ${port} ***\n`));
