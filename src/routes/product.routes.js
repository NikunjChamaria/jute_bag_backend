const router = require("express").Router();
const p = require("../controllers/product.controller");
const upload = require("../middlewares/upload");


router.post(
  "/",
  upload.single("image"),
  p.createProduct
);

router.get("/:subcategoryId", p.getProductsBySubcategory);
router.put("/:id", p.updateProduct);
router.delete("/:id", p.deleteProduct);

module.exports = router;
