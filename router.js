const express = require("express");
const posts = require("./data/db");
const router = express.Router();

router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      error: "Please provide the title and contents of the post."
    });
  } else {
    posts
      .insert(req.body)
      .then(post => res.status(201).json(req.body))
      .catch(err =>
        res.status(500).json({
          error:
            "We encountered an error while saving this post to the database."
        })
      );
  }
});

router.post("/:id/comments", (req, res) => {
  const id = req.params.id;
  const commentObj = { ...req.body, post_id: id };

  posts
    .findById(id)
    .then(post => {
      if (!post[0]) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res.status(500).json({
        error: "There was an error while saving the comment to the database."
      })
    );

  if (!req.body.text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    posts
      .insertComment(commentObj)
      .then(() => {
        res.status(201).json(commentObj);
      })
      .catch(err =>
        res.status(500).json({
          error: "There was an error while saving the comment to the database."
        })
      );
  }
});

router.delete("/:id", (req, res) => {
  posts
    .remove(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(req.params.id);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The post could not be removed." })
    );
});

router.get("/", (req, res) => {
  posts
    .find(req.query)
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
    );
});

router.get("/:id", (req, res) => {
  posts
    .findById(req.params.id)
    .then(post => {
      if (post[0]) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." })
    );
});

module.exports = router;
