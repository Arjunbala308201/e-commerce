import React, { useEffect, useState } from 'react';
import emptycart from '../../assets/cart/cart-empty.png';
import emptyGrocery from '../../assets/cart/cart-grocery.png';
import { Link, useLocation, useOutletContext } from 'react-router-dom';
import { Card } from './Card';

export const CartContent = ({ isLogin }) => {
    const path = useLocation().pathname;
    console.log(path);

    const [isCart, setIsCart] = useState(false);
    const [isWishList, setIsWishList] = useState(false);
    const [groceriesPath, setGroceriesPath] = useState(false);

    const { wishlistItems, fetchWishlist, cartItems, getCartProducts } = useOutletContext();
    console.log(wishlistItems, 'extracted wishlist products received from outlet context');
    console.log(cartItems, 'extracted products received from outlet context');

    useEffect(() => {
        setIsWishList(path === '/outlet/wishlist/flipkart');
        setIsCart(path === '/outlet/cart/flipkart');
        setGroceriesPath(path === '/outlet/cart/groceries');
    }, [path]);

    return (
        <>
            {isLogin ? (
                <div className={`flex w-full bg-white py-10`}>
                    <div className="flex flex-col w-full h-full ">
                        {groceriesPath ? (
                            <div className="w-full flex flex-col justify-center items-center gap-2">
                                <img src={emptyGrocery} alt="empty cart" className="h-52 w-72" />
                                <div className="text-lg">Your Basket is empty</div>
                                <Link to="/" className="bg-blue-600 w-64 text-white text-center py-2 mt-5">
                                    Shop Now
                                </Link>
                            </div>
                        ) : (
                            <div className="w-full flex flex-col bg-gray-100 justify-center items-center gap-2">
                                {isWishList && wishlistItems.length > 0 ? (
                                    <Card
                                        productList={wishlistItems}
                                        fetchFunction={fetchWishlist}
                                        isCart={isCart}
                                        isWishlist={isWishList}
                                        isLogin={isLogin}
                                    />
                                ) : isCart && cartItems.length > 0 ? (
                                    <Card
                                        productList={cartItems}
                                        fetchFunction={getCartProducts}
                                        isCart={isCart}
                                        isWishlist={isWishList}
                                        isLogin={isLogin}
                                    />
                                ) : (
                                    <div className="w-full flex h-[400px] flex-col justify-center items-center gap-2">
                                        <img src={emptycart} alt="empty cart" className="h-52 w-72" />
                                        <div className="text-lg">Missing items?</div>
                                        {isLogin ? (
                                            <Link to="/" className="px-2 bg-[#fb641b] w-64 text-white text-center py-2 mt-5">
                                                Shop Now
                                            </Link>
                                        ) : (
                                            <div>
                                                <div className="text-sm">Login to see the items you added previously</div>
                                                <Link to="/outlet/login" className="bg-[#fb641b] w-64 text-white text-center py-2 mt-5">
                                                    Login
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex w-full h-[400px] bg-white py-10">
                    <div className="flex flex-col w-full h-full ">
                        {groceriesPath ? (
                            <div className="w-full flex flex-col justify-center items-center gap-2">
                                <img src={emptyGrocery} alt="empty grocery cart" className="h-52 w-72" />
                                <div className="text-lg">Your Basket is empty</div>
                                <Link to="/" className="bg-blue-600 w-64 text-white text-center py-2 mt-5">
                                    Shop Now
                                </Link>
                            </div>
                        ) : (
                            <div className="w-full flex flex-col justify-center items-center gap-2">
                                <img src={emptycart} alt="empty cart" className="h-52 w-72" />
                                <div className="text-lg">Missing Cart items?</div>
                                <div className="text-sm">Login to see the items you added previously</div>
                                <Link to="/outlet/login" className="bg-[#fb641b] w-64 text-white text-center py-2 mt-5">
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
