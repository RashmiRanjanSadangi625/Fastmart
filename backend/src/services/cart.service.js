const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");


async function createCart(user)
{
    try 
    {
        const cart =new Cart({user})
        const createdCart =await cart.save();
        return createdCart;    
    } catch (error) { throw new Error(error.message)}
}

async function findUserCart(userId){
    
    try {
        let cart = await Cart.findOne({user:userId});
        
        let cartItems = await CartItem.find({cart:cart._id}).populate("product");

        cart.cartItems=cartItems;

        let totalPrice = 0;
        let totalDiscountedPrice =0;
        let totalItem =0;

        for(let cartItem of cart.cartItems)
        {
            totalPrice+=cartItem.price;
            totalDiscountedPrice+=cartItem.discountedPrice;
            totalItem+= cartItem.quantity;
        }

        cart.totalPrice=totalPrice;
        cart.totalItem = totalItem;
        cart.discount = totalPrice-totalDiscountedPrice;

        return cart;
        
    } catch (error) { throw new Error(error.message);   }
}
async function addItemToCart(userId, req) {
    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, cartItems: [], totalPrice: 0, totalDiscountedPrice: 0, discountPercent: 0 });
            await cart.save();
        }

        const product = await Product.findById(req.productId);
        if (!product) {
            throw new Error("Product not found");
        }

        let cartItem = await CartItem.findOne({ cart: cart._id, product: product._id, userId });

        if (cartItem) {
            cartItem.quantity += 1;
            await cartItem.save();
        } else {
            cartItem = new CartItem({
                product: product._id,
                cart: cart._id, 
                quantity: 1,
                userId,
                price: product.price,
                size: req.size,
                discountedPrice: product.discountedPrice,
            });

            const createdCartItem = await cartItem.save();
            cart.cartItems.push(createdCartItem);
        }

        // **Recalculate Cart Totals**
        await updateCartTotals(cart);

        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
}


// async function addItemToCart(userId, req) {
//     try {
//         let cart = await Cart.findOne({ user: userId });

//          // console.log("Cart",cart)

//         if (!cart) {
//             cart = new Cart({ user: userId });
//             await cart.save();
//         }
//          // console.log("Product",req.productId)

//         const product = await Product.findById(req.productId);
//          console.log("Product",product)
//         if (!product) {
//             throw new Error("Product not found");
//         }

//         let cartItem = await CartItem.findOne({ cart: cart._id, product: product._id, userId });

//          console.log("CartItem",cartItem)

//         if (cartItem) {
           
//             cartItem.quantity += 1;
//             await cartItem.save();
//             return "Item quantity updated in cart";
//         } 
//         else 
//         {
//             cartItem = new CartItem({
//                 product: product._id,
//                 cart: cart._id, 
//                 quantity: 1,
//                 userId,
//                 price: product.price,
//                 size: req.size,
//                 discountedPrice: product.discountedPrice,
//                 discountPersent:product.discountPersent
//             });

//             const createdCartItem = await cartItem.save();
//             cart.cartItems.push(createdCartItem);
//             await cart.save();



//             return createdCartItem;
//         }
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }
async function updateCartTotals(cart) {
    let totalPrice = 0;
    let totalDiscountedPrice = 0;

    for (const itemId of cart.cartItems) {
        const item = await CartItem.findById(itemId).populate("product");

        if (item && item.product) {
            totalPrice += item.price * item.quantity;
            totalDiscountedPrice += item.discountedPrice * item.quantity;
        }
    }

    const discountPersent = totalPrice > 0 ? ((totalPrice - totalDiscountedPrice) / totalPrice) * 100 : 0;

    cart.totalPrice = totalPrice;
    cart.totalDiscountedPrice = totalDiscountedPrice;
    cart.discountPersent = discountPersent.toFixed(2); 

    await cart.save();
}




module.exports={createCart,findUserCart,addItemToCart,updateCartTotals};