const { fetchUserInCollection, checkAdminKey, verifyAuthor,fetchDiscussion } = require("../middlewares/discussions.middleware");
const { validateDiscussion, validateComment } = require("../validation/discussions.validator");
const {
    createDiscussion,
    getDiscussionsAll1,
    getDiscussionsByUsername,
    getDiscussionsById,
    deleteDiscussionsById,
    updateDiscussionsById,
    AddCommentWithAuhtorId } = require("../controllers/discussions.controller");

const router = require("express").Router();

router.get("/all1", checkAdminKey, getDiscussionsAll1);
router.post("/new", validateDiscussion, fetchUserInCollection, createDiscussion);
router.get("/user/:username", getDiscussionsByUsername);
router.get("/id/:id", getDiscussionsById);
// console.log("hello from route")
router.delete("/id/:id", verifyAuthor, deleteDiscussionsById);
router.patch("/id/:id", verifyAuthor, updateDiscussionsById);
router.put("/:id/comment", validateComment,fetchUserInCollection,fetchDiscussion, AddCommentWithAuhtorId);

module.exports = router;
