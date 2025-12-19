const router = require("express").Router();
const c = require("../controllers/category.controller");

router.post("/", c.createCategory);
router.get("/", c.getCategories);
router.put("/:id", c.updateCategory);
router.delete("/:id", c.deleteCategory);

module.exports = router;
