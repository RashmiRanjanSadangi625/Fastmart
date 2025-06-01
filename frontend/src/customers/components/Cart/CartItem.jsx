    import { IconButton } from '@mui/material'
    import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
    import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
    import React from 'react'
    import { Button } from '@mui/material'
    import { useDispatch } from 'react-redux'; 
    import { removeCartItem, updateCartItem } from '../../../State/Cart/Action';

    const CartItem = ({ item }) => {
        const dispatch = useDispatch();
    
        // Ensure product is always an object
        const product = Array.isArray(item?.product) ? item.product[0] : item?.product;
    
        const handleUpdateCartItem = (num) => { 
            const updatedQuantity = item?.quantity + num;
    
            const data = {
                data: {
                    quantity: updatedQuantity,
                    price: updatedQuantity * product?.price,
                    discountedPrice: updatedQuantity * product?.discountedPrice,
                    discountPersent: product?.discountPersent, 
                },
                cartItemId: item?._id,
            };
    
            dispatch(updateCartItem(data));
        };
    
        const handleRemoveCartItem = () => {
            dispatch(removeCartItem({ cartItemId: item?._id }));
        };
    
        return (
            <div className='p-6 shadow-lg border border-gray-400 rounded-md m-3 shadow-gray-500'>
                <div className='flex items-start'>
                    <div className='w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]'>
                        <img className='w-full h-full object-cover object-top' src={product?.imageUrl} />
                    </div>
                    <div className='ml-5 space-y-1'>
                        <p className='font-semibold'>{product?.title}</p>
                        <p className='opacity-70'>Size: {item?.size}, Color: {product?.color}</p>
                        <p className='opacity-70 mt-2'>Seller: {product?.brand}</p>
                        <div className='flex space-x-5 items-center text-gray-900 pt-6'>
                            <p className="font-semibold">₹{item?.discountedPrice}</p>
                            <p className="opacity-50 line-through">₹{item?.price}</p>
                            <p className="text-green-600 font-semibold">{product?.discountPersent}% off</p>
                        </div>
                    </div>
                </div>
                <div className='lg:flex items-center lg:space-x-10 pt-4'>
                    <div className='flex items-center space-x-2'>
                        <IconButton onClick={() => handleUpdateCartItem(-1)} disabled={item?.quantity <= 1}>
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                        <span className='py-1 px-7 border rounded-sm'>{item?.quantity}</span>
                        <IconButton onClick={() => handleUpdateCartItem(1)} sx={{ color: "RGB(145,85,253)" }}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </div>
                    <div>
                        <Button onClick={handleRemoveCartItem} sx={{ color: "RGB(145,85,253)" }}>Remove</Button>
                    </div>
                </div>
            </div>
        );
    };
    
    export default CartItem;
    