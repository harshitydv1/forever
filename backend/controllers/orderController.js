import orderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import Stripe from 'stripe';

// import razporpay from 'razorpay';


// global variable
const currency = 'inr'
const deliveryCharges = 10

// getway initialize 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// Razorpay instance-----------------------------
// const razorpayInstance = new razporpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// })
// -----------------------------------------------


// Placing orders using COD Method
const placeOrder = async (req, res) => {

    try {
        

        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount, 
            paymentMethod: "COD", 
            payment: false, 
            Date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await UserModel.findByIdAndUpdate(userId, {cartData: {}}); // Clear the user's cart after placing the order 

        res.json({ success: true, message: "Order placed successfully" });


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}



// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;


        const orderData = {
            userId,
            items,
            address,
            amount, 
            paymentMethod: "Stripe", 
            payment: false, 
            Date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name:item.name
                },
                unit_amount: item.price * 100
            },quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharges * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })
        res.json({ success: true, session_url: session.url });


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        
    }
}

// Verify stripe
const verifyStripe = async (req,res) => {
    const { orderId, success, userId } = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });

            await UserModel.findByIdAndUpdate(userId, { cartData: {} })
            
            res.json({ success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false});
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}





// -------------------------------------------------------

// Placing orders using Razorpay Method
// const placeOrderRazorpay = async (req, res) => {
//     try {
//         const { userId, items, amount, address } = req.body;

//         const orderData = {
//             userId,
//             items,
//             address,
//             amount, 
//             paymentMethod: "Razorpay", 
//             payment: false, 
//             Date: Date.now(),
//         };

//         const newOrder = new orderModel(orderData);
//         await newOrder.save();

//         const options = {
//             amount: amount * 100,  // Amount in paise
//             currency: currency.toUpperCase(),
//             receipt: newOrder._id.toString(),
//         }

//         await razorpayInstance.orders.create(options, (error,order) => {
//             if (error) {
//                 console.log(error);
//                 return res.json({ success: false, message: error.message });
//             } else {
//                 res.json({ success: true, order });
//             }
//         })

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }




//--------------------------------------------------------------------------




// All Orders for admin Panel
const allOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({});
        res.json({ success: true, orders });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
    
}




// User Order data for for Frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({userId})
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
    
}



//update order status 
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        await orderModel.findByIdAndUpdate(orderId, { status });

        res.json({ success: true, message: "Order status updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}





export { verifyStripe, placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus };