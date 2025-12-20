const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "*"
}));


app.use(express.json());

app.use("/categories", require("./routes/category.routes"));
app.use("/subcategories", require("./routes/subcategory.routes"));
app.use("/products", require("./routes/product.routes"));

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
