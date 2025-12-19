const pool = require("../config/db");

// CREATE
exports.createCategory = async (req, res) => {
  const { name, slug, description, longDescription } = req.body;
  const result = await pool.query(
    `INSERT INTO categories (name, slug, description, long_description)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, slug, description, longDescription]
  );
  res.status(201).json(result.rows[0]);
};

// READ ALL
exports.getCategories = async (_, res) => {
  const result = await pool.query("SELECT * FROM categories");
  res.json(result.rows);
};

// UPDATE
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, slug, description, longDescription } = req.body;

  const result = await pool.query(
    `UPDATE categories
     SET name=$1, slug=$2, description=$3, long_description=$4
     WHERE id=$5 RETURNING *`,
    [name, slug, description, longDescription, id]
  );
  res.json(result.rows[0]);
};

// DELETE
exports.deleteCategory = async (req, res) => {
  await pool.query("DELETE FROM categories WHERE id=$1", [req.params.id]);
  res.sendStatus(204);
};
