const pool = require("../config/db");

// CREATE
exports.createSubcategory = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      error: "Request body is missing. Use multipart/form-data."
    });
  }

  const { name, slug, description, longDescription, categoryID } = req.body;

  const imageUrl = req.file ? req.file.path : null;

  const result = await pool.query(
    `INSERT INTO subcategories
     (name, slug, description, long_description, image, category_id)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [name, slug, description, longDescription, imageUrl, categoryID]
  );

  res.status(201).json(result.rows[0]);
};


// READ BY CATEGORY
exports.getSubcategories = async (req, res) => {
    if (req.query.categoryId) {
        const result = await pool.query(
    `SELECT * FROM subcategories WHERE category_id=$1`,
    [req.query.categoryId]
  );
  res.json(result.rows);
    }

    if (req.query.slug) {
        const result = await pool.query(
            `SELECT * FROM subcategories WHERE slug=$1 LIMIT 1`,
            [req.query.slug]
        );
        res.json(result.rows[0]);
    }

};

// UPDATE (image optional)
exports.updateSubcategory = async (req, res) => {
  const { id } = req.params;
  const { name, slug, description, longDescription } = req.body;

  const imageUrl = req.file ? req.file.path : null;

  const result = await pool.query(
    `UPDATE subcategories
     SET name=$1,
         slug=$2,
         description=$3,
         long_description=$4,
         image=COALESCE($5, image)
     WHERE id=$6
     RETURNING *`,
    [name, slug, description, longDescription, imageUrl, id]
  );

  res.json(result.rows[0]);
};

// DELETE
exports.deleteSubcategory = async (req, res) => {
  await pool.query("DELETE FROM subcategories WHERE id=$1", [req.params.id]);
  res.sendStatus(204);
};
