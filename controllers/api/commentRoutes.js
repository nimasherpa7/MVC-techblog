const router = require("express").Router();
const { Comment } = require("../../models");
const isAuth = require("../../utils/auth");

// Create a comment
router.post("/", async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a comment
router.put("/:id", isAuth, async (req, res) => {
  try {
    const [updatedCount] = await Comment.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (updatedCount === 1) {
      res.status(200).json({ message: "Comment updated successfully" });
    } else {
      res.status(404).json({ message: "No comment found with this id" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a comment
router.delete("/:id", isAuth, async (req, res) => {
  try {
    const deletedCount = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (deletedCount === 1) {
      res.status(200).json({ message: "Comment deleted successfully" });
    } else {
      res.status(404).json({ message: "No comment found with this id" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
