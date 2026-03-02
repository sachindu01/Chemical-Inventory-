import {v2 as cloudinary} from "cloudinary"
import productModel from '../models/productModel.js';


// function for add product
const addProduct = async (req, res) => {
  try {
    const { name, description, category, subCategory, availability, quantity, unit,location } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const locationImage1 = req.files.locationImage1 && req.files.locationImage1[0];
    const locationImage2 = req.files.locationImage2 && req.files.locationImage2[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
    const locationImages = [locationImage1, locationImage2].filter((item) => item !== undefined);

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    const locationImagesUrl = await Promise.all(
      locationImages.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    const productsData = {
      name,
      description,
      category,
      subCategory,
      quantity: Number(quantity),
      unit,
      availability: availability === 'true',
      image: imagesUrl,
      locationImage: locationImagesUrl,
      date: Date.now(),
      location
    };

    console.log(productsData);

    const product = new productModel(productsData);
    await product.save();

    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



// function for list products
const listProducts = async (req,res) => {
    try {

        const products = await productModel.find({});
        res.json({success:true,products})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
   
    }
    
}

// function to remove products
const removeProduct = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product removed"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
    
}

// function for single product info
const singleProduct = async (req,res) => {
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
    
}

// function to update products
const updateProduct = async (req,res) => {

  try {

      const { productId, quantity } = req.body;

      // Find the product by its ID
      const product = await productModel.findById(productId);

      if (!product) {
        return res.json({ success: false, message: "Product not found" });
      }

      // Update the product's quantity
      product.quantity = Number(quantity);

      await product.save();

      res.json({ success: true, message: "Product quantity updated " });

      
  } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
      
  }
  
}


export {listProducts,addProduct,removeProduct,singleProduct,updateProduct}