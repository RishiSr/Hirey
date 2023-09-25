const { createSkill, getSkills } = require("../controller/skill");

const router = require("express").Router();

router.post("/add", createSkill);
router.get("/", getSkills);

module.exports = router 