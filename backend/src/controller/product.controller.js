const productService = require("../services/product.service");

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);

    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

  
const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.deleteProduct(productId);

    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.updateProduct(productId, req.body);

    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const findProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.findProductById(productId);

    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


const getAllProducts = async (req, res) => {
  try {
    // console.log('controller',req.query)
    const products = await productService.getAllProducts(req.query);

    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send({ error: error.message });  
  }
};


const createMultipleProducts = async (req, res) => {
  try { 
      const products = await productService.createMultipleProducts(req.body);
      if (products) {
        return res.status(201).send({ message: "Products created successfully!", data: products });
      }  
      return res.status(500).send({ error: "Failed to create products" });  
  } 
  catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const findProductsBySearch = async(req,res)=>{
  try {
    // console.log('controller',req)
    const products = await productService.findProductsBySearch(req.query); 

    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send({ error: error.message });  
  }
}

const searchProductsByCategory = async (req, res) => {
  // console.log('controller',req.body);
  try {
    const { categoryNames } = req.body;
    const productsGrouped = await productService.findProductsByCategoryNames(categoryNames);
    res.json(productsGrouped);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  createMultipleProducts,
  findProductById,
  findProductsBySearch,
  searchProductsByCategory
};
