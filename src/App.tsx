import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Account from "./pages/Account";
import Address from "./pages/Address";
import Profile from "./pages/Profile";
import TransactionHistory from "./pages/TransactionHistory";
import ProductDetail from "./components/ProductDetail";
import Cart from "./pages/CartPage/Cart";
import Checkout from "./pages/CartPage/CheckOut";
import ProductPage from "./pages/ProductPage";

function AppContent() {
  const location = useLocation();
  const hideFooterPaths = ["/"];

  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkOut" element={<Checkout />} />
        <Route path="/account" element={<Account />}>
          <Route index element={<Profile />} />
          <Route path="address" element={<Address />} />
          <Route path="transactionHistory" element={<TransactionHistory />} />
        </Route>
      </Routes>

      {shouldShowFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
