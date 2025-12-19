const router = require("express").Router();
const controller = require("../controllers/subcategory.controller");
const upload = require("../middlewares/upload");

router.post(
  "/",
  upload.single("image"),
  controller.createSubcategory
);

router.get("/", controller.getSubcategories);
router.put("/:id", upload.single("image"), controller.updateSubcategory);
router.delete("/:id", controller.deleteSubcategory);

module.exports = router;
