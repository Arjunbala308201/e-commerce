import wishList from "../model/Wishlist.js";
export const addTowishList = async (req, res) => {
    try {
        const userId = req.params.userId;
        const productId = req.body.productId
        let userWishlist = await wishList.findOne({ userId });

            if (userWishlist) {
            const alreadyExist = await wishList.findOne({ userId, product: productId });

            if (alreadyExist) {
                console.log("Already in wishlist:", alreadyExist);
                return res.status(200).json({ message: "Product already exists in wishlist",toast:'warning' });
            }
            const nweWishListItem = new wishList({ userId, product:productId});
            await nweWishListItem.save();

            return res.status(201).json({ message: "Product added to wishlist",toast:'success', data: nweWishListItem });
        } else {
            const newCart = await wishList.create({
                userId,
                product :productId
            });
            res.status(200).send({message:'Added to Wishlist',data:newCart,toast:'success'})
    }
} catch (error) {
    console.error("Error adding product:", error.message);
    return res.status(500).send({
        message: error.message,
    });
}}
export const fetchFromWish = async (req, res) => {
    try {
        const userId = req.params.userId
        console.log('userid from api',userId)
        const products = await wishList.find({userId:userId}).populate('product')
        console.log(products)
        if(products.length >0){
            res.status(200).json(products);
        }
        else{
            res.status(200).send({message:'your wishlist Is empty',data:products});
        }
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).send({
            message: error.message,
        });
    }
};

export const deleteFromwishList = async (req, res) => {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;
  
      console.log('Product ID:', productId, 'User ID:', userId);
  
      const userWishlist = await wishList.findOne({ userId:userId });
  
      if (!userWishlist) {
        return res.status(404).send({ message: 'Wishlist not found for this user' });
      }

      const updatedWishlist = await userWishlist.deleteOne({product:productId})
      if (updatedWishlist) {
        return res.status(200).send({
          message: 'Product Deleted from your wishlist',
          data: updatedWishlist,
        });
      } else {
        return res.status(404).send({ message: 'Product not found in your wishlist' });
      }
  
    } catch (error) {
      console.log('Error:', error.message);
      return res.status(500).send({
        message: 'Error deleting the product: ' + error.message,
      });
    }
  };
  