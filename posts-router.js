const express = require('express');

const posts = require('./data/db.js');

const router = express.Router();
// URI: /api/hubs

router.get("/", async (req, res) => {

  try {
    const posts = await db.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The posts information could not be retrieved"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await db.findById(req.params.id);

    if ((post == [])) {
      res.status(404).json({
        message: "The post with the specified ID does not exist"
      });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The post information could not be retrieved"
    });
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    if ((post == [])) {
      res.status(404).json({
        message: "The post with the specified ID does not exist"
      });
    } else {
      const comment = await db.findPostComments(req.params.id);
      res.status(201).json(comment);
    }
  } catch (error) {
    res.status(500).json({
      error: "The comments information could not be retrieved"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const post = req.body;
    if (post.title && post.contents) {
      await db.insert(post);
      res.status(201).json(post);
    } else {
      res.status(400).json({
        message: "Please provide title and contents for the post"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There was an error while saving the post to the database"
    });
  }
});

router.post("/:id/comments", async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    if (post == []) {
      res.status(404).json({
        message: "The post with the specified ID does not exist"
      });
    } else if (!req.body.text) {
      res.status(400).json({
        errorMessage: "Please provide text for the comment"
      });
    } else {
      await db.insertComment(req.body);
      res.status(201).json(req.body.text);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the comment to the database"
    });
  }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const post = await db.findById(id)

        if (post == []) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else if (!data.title || !data.contents) {
            res.status(500).json({
                errorMessage: "Please provide title and contents for the post"
            })
        } else {
            await db.update(id, data)
            res.status(201).json(data)
        }
    } catch (error) {
        res.status(500).json({
            error: "The post information could not be modified"
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const post = await db.findById(req.params.id)
        if (post == []) {
            res.status(404).json({
                message:"The post with the specified ID does not exist"
            })
        } else {
            await db.remove(req.params.id)
            res.status(201).json({
                message: "Deleted"
            })
        }
    }  catch(error) {
        res.status(500).json({
            error: "The post could not be removed"
        })
    }
})

module.exports = router; 