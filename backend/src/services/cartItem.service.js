const userService = require("../services/user.service");
const CartItem = require("../models/cartItem.model");
const Cart = require("../models/cart.model");

// async function updateCartItem(userId, cartItemId, cartItemData) {
//   try {
//     const item = await findCartItemById(cartItemId);

//     if (!item) {
//       throw new Error("cart item not found:", cartItemId);
//     }
//     const user = await userService.findUserById(item.userId);

//     if (!user) {
//       throw new Error("user not found:", userId);
//     }
    
//     if (user._id.toString() === userId.toString()) {
//       item.quantity = cartItemData.quantity;
//       item.price = item.quantity * item.product[0].price;
//       item.discountedPrice = item.quantity * item.product[0].discountedPrice;

//       const updateCartItem = await item.save();

//       return updateCartItem;
//     } else {
//       throw new Error("you can't update this cart item");
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }
async function updateCartItem(userId, cartItemId, cartItemData) {
  try 
  {
    const item = await findCartItemById(cartItemId);
    // console.log("item",item)

    if (!item) {
      throw new Error("Cart item not found");
    }
    
    const user = await userService.findUserById(item.userId);
    // console.log("user",user)
    if (!user) {
      throw new Error("User not found");
    }

      if (user._id.toString() === userId.toString()) 
      {
        // Update item quantity & price
        item.quantity = cartItemData.quantity;
        item.price = item.quantity * item.product[0].price;
        item.discountedPrice = item.quantity * item.product[0].discountedPrice;
        const updatedCartItem = await item.save(); // Save updated cart item

        // Fetch the associated cart
        const cart = await Cart.findById(item.cart).populate({
            path: "cartItems",
            populate: { path: "product" }, 
          });


        // console.log("cart discountPersent",item.cart)
        if (!cart) {
          throw new Error("Cart not found");
        }

        // Recalculate cart totals
        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalItems = 0;

        cart.cartItems.forEach((cartItem) => 
        {
          if (cartItem.product.length > 0 && cartItem.product[0].price !== undefined) 
          {
            totalItems += cartItem.quantity;
            totalPrice += Number(cartItem.quantity) * Number(cartItem.product[0].price);
            totalDiscountedPrice += Number(cartItem.quantity) * Number(cartItem.product[0].discountedPrice);
          }
        });


        // Calculate discount percentage
        const discountPersent = totalPrice === 0 ? 0 : ((totalPrice - totalDiscountedPrice) / totalPrice) * 100;

        // console.log("cart data",totalItems)
        // console.log("cart data",totalPrice)
        // console.log("cart data",totalDiscountedPrice)
        // console.log("cart data",discountPersent)

        // Update cart values
        cart.totalPrice = totalPrice;
        cart.totalDiscountedPrice = totalDiscountedPrice;
        cart.totalItem = totalItems;
        cart.discountPersent = discountPersent.toFixed(2);

        await cart.save(); // Save updated cart

        // console.log("cartupdated",cart)

        return cart;
      } 
      else 
      {
        throw new Error("You can't update this cart item");
      }
  } catch (error) {
    throw new Error(error.message);
  }
}




// async function removeCartItem(userId, cartItemId) {
//   const cartItem = await findCartItemById(cartItemId);

//   const user = await userService.findUserById(userId);
//   console.log(user._id.toString(),cartItem.userId.toString());
  
//   if (user._id.toString() === cartItem.userId.toString()) 
//     {
//     return await CartItem.findByIdAndDelete(cartItemId);
//   } 
//   else 
//   {
//     throw new Error("you can't remove other user's item");
//   }
// }

async function removeCartItem(userId, cartItemId) {
  const cartItem = await findCartItemById(cartItemId);
  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  const user = await userService.findUserById(userId);
  // console.log(user._id.toString(), cartItem.userId.toString());

  if (user._id.toString() === cartItem.userId.toString()) {
    const deletedItem = await CartItem.findByIdAndDelete(cartItemId);  // Delete the cart item

    // Find the cart that contains this cart item
    const cart = await Cart.findById(cartItem.cart).populate("cartItems");
    if (!cart) {
      throw new Error("Cart not found");
    }

    // Remove the deleted cart item from cartItems array
    cart.cartItems = cart.cartItems.filter(item => item._id.toString() !== cartItemId);
    cart.markModified("cartItems");

    // Recalculate cart totals
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItems = 0;

    cart.cartItems.forEach((item) => {
      if (item.product.length > 0) {
        totalItems += item.quantity;
        totalPrice += item.quantity * item.product[0].price;
        totalDiscountedPrice += item.quantity * item.product[0].discountedPrice;
      }
    });

    // Calculate discount percentage
    const discountPersent = totalPrice === 0 ? 0 : ((totalPrice - totalDiscountedPrice) / totalPrice) * 100;

    // Update cart values
    cart.totalPrice = totalPrice;
    cart.totalDiscountedPrice = totalDiscountedPrice;
    cart.totalItem = totalItems;
    cart.discountPersent = discountPersent.toFixed(2);

    await cart.save();  // Save updated cart

    return deletedItem;  // Keep the original function's return behavior
  } else {
    throw new Error("You can't remove another user's item");
  }
}


async function findCartItemById(cartItemId) {
  const cartItem = await CartItem.findById(cartItemId).populate("product");
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error("cart item not found wiht id:", cartItemId);
  }
}

module.exports = {
  updateCartItem,
  removeCartItem,
  findCartItemById,
};
