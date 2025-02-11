import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { SearchedProducts } from './Components/Pages/SearchedProducts';
import { Login } from './Components/Pages/Login';
import { Signup } from './Components/Pages/Signup';
import { Cart } from './Components/Pages/Cart';
import { CartContent } from './Components/Subcomponents/CartContent';
import { Wishlist } from './Components/Pages/Wishlist';
import { ToastContainer } from 'react-toastify';
import { ProductPreview } from './Components/Subcomponents/ProductPreview';
import { Main } from './Components/Outlet/Main';
import { Home } from './Components/Pages/Home';
import { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import { BuyNow } from './Components/Pages/BuyNow';
import "aos/dist/aos.css";
import AOS from "aos";
import { MyOrders } from './Components/Pages/MyOrders';
AOS.init();

function App() {

  const [isLogin, setIsLogin] = useState(false);
  const validUser = useSelector((state) => state.user);
  
  useEffect(() => {
    if (validUser && validUser._id) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    console.log(validUser, 'valid user');
  }, [validUser]); // Added validUser as a dependency
  
  return (
    <>
        <ToastContainer
          className='mt-20'
          position="top-right" // Default position
          autoClose={1000}     // Default timing: 3 seconds
        // Can be 'dark' or 'colored'
        />
        <div className='min-h-screen bg-gray-100' >
          <Router >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/outlet' element={<Main isLogin={isLogin}/>}>  
              <Route path='/outlet:search' element ={<SearchedProducts/>}/>
              <Route path='/outlet/:category/:productId' element ={<ProductPreview/>}/>
              <Route path='/outlet/orders/:userId' element={<MyOrders/>}/>
              <Route path='/outlet:userId/buynow' element={<BuyNow/>}/>
              <Route path='/outlet/buynow/:productId' element={<BuyNow/>}/>
                <Route path='/outlet/login' element={<Login />}/>
                <Route path='/outlet/signup' element={<Signup/>}/>
                <Route path='/outlet/wishlist' element={<Wishlist isLogin={isLogin}/>}>
                  <Route path='/outlet/wishlist/flipkart' element ={<CartContent  isLogin={isLogin} isWishList={true}/>}/>
                  <Route path='/outlet/wishlist/groceries' element ={<CartContent groceries={true} isLogin={isLogin} isWishList={true}/>}/>
                </Route>
                <Route path='/outlet/cart' element={<Cart isLogin={isLogin}/>}>
                  <Route path='/outlet/cart/flipkart' element ={<CartContent isLogin={isLogin} isCart={true}/>}/>
                  <Route path='/outlet/cart/groceries' element ={<CartContent groceries={true} isLogin={isLogin} isCart={true}/>}/>
                </Route>
              </Route>
            </Routes>
          </Router>
        </div>
            </>
  );
}

export default App;

