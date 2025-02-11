import product from "../model/Product.js";
import Product from "../model/Product.js";
import mongoose from "mongoose";

export const fetchProducts = async (req, res) => {
  try {
    const query = req.query.search;
    console.log("Search query received:", query);

    const search = {};
    if (query) {
      const conditions = [
        { category: { $regex: query, $options: "i" } }, // Case-insensitive search
        { brand: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } },
        { type: { $regex: query, $options: "i" } }

      ];

      // Check if query can be an ObjectId
      if (mongoose.Types.ObjectId.isValid(query)) {
        conditions.push({ _id: query });
      }

      search.$or = conditions;
    }

    const products = await Product.find(search);
    console.log("Products found:", products);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).send({ message: error.message });
  }
};

  

export const addProduct = async (req, res) => {
    try {

        const product = req.body; // Get product data from the request body
        const addedProduct = await Product.create(product); // Wait for the database operation to complete
        res.status(201).json(addedProduct); // Send the newly added product as the response
        console.log("Product added:", addedProduct);
    } catch (error) {
        console.error("Error adding product:", error.message);
        res.status(500).send({
            message: error.message,
        });
    }
};

export const deleteProduct = async(req,res)=>{
    try {
        const id = req.params.id
        const productTodelete = await product.findById(id)
        await Product.findByIdAndDelete(id)
        console.log('Product Deleted')
        res.send({
            message:'Product deleted',
            data:productTodelete
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message:error.message
        })
    }
}

