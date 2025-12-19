const pool = require("../config/db");

// CREATE
exports.createProduct = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            error: "Request body is missing. Use multipart/form-data."
        });
    }
    const { name, slug, description, subCategoryID } = req.body;

    const imageUrl = req.file ? req.file.path : null;

    const result = await pool.query(
        `INSERT INTO products
     (name, slug, image, description, subcategory_id)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
        [name, slug, imageUrl, description, subCategoryID]
    );
    res.status(201).json(result.rows[0]);
};

// READ BY SUBCATEGORY ID ✅
exports.getProductsBySubcategory = async (req, res) => {
    const { subcategoryId } = req.params;

    const result = await pool.query(
        `SELECT * FROM products WHERE subcategory_id=$1`,
        [subcategoryId]
    );
    res.json(result.rows);
};

// UPDATE
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, slug, image, description } = req.body;

    const result = await pool.query(
        `UPDATE products
     SET name=$1, slug=$2, image=$3, description=$4
     WHERE id=$5 RETURNING *`,
        [name, slug, image, description, id]
    );
    res.json(result.rows[0]);
};

// DELETE
exports.deleteProduct = async (req, res) => {
    await pool.query("DELETE FROM products WHERE id=$1", [req.params.id]);
    res.sendStatus(204);
};
