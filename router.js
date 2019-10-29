const express = require("express");
const Posts = require("./data/db");
const router = express.Router();

router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide the title and contents of the post."
    });
  } else {
    Posts.insert(req.body)
      .then(post => res.status(201).json(req.body))
      .catch(err =>
        res.status(500).json({
          error:
            "We encountered an error while saving this post to the database."
        })
      );
  }
});
