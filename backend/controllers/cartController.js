import UserModel from "../models/userModel.js";


// add product to cart
const addToCart = async (req,res) => {
    try {
        
        const { userId, itemId, size } = req.body;
        const userData = await UserModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        let cartData = await userData.cartData;

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                    cartData[itemId][size] += 1;
            }else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await UserModel.findByIdAndUpdate(userId, {cartData});
        res.json({ success: true, message: "Product added to cart successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}


// uodate user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const userData = await UserModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        await UserModel.findByIdAndUpdate(userId, { cartData});
        res.json({ success: true, message: "Cart updated successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// get user cart data
const getUserCart =  async (req, res) => {
    try {
        const { userId } = req.body;
         const userData = await UserModel.findById(userId);
         if (!userData) {
             return res.json({ success: false, message: "User not found" });
         }
         let cartData = await userData.cartData;
            res.json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export { addToCart, updateCart, getUserCart }; 