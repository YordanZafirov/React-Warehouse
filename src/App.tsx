import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import styled from "styled-components";

import Footer from "./components/footer/Footer";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Client from "./pages/Client/Client";
import Warehouse from "./pages/Warehouse/Warehouse";
import Order from "./pages/Order/Order";
import { route } from "./static/router/Routes";
import { AuthProvider } from "./context/AuthContext";
import ProductPage from "./pages/Product/ProductPage";
import { CartProvider } from "./context/CartContext";
import NotFound from "./pages/NotFound/NotFound";

export const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const StyledMain = styled.main`
  flex: 1;
  width: 100%;
`;


function App() {
  return (
    <StyledLayout>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Navigation />
            <StyledMain>
              <Routes>
                <Route path={route.client} element={<Client />} />
                <Route path={route.product} element={<ProductPage />} />
                <Route path={route.warehouse} element={<Warehouse />} />
                <Route path={route.order} element={<Order />} />
                <Route path={route.register} element={<Register />} />
                <Route path={route.login} element={<Login />} />
                <Route path={route.notFound} element={<NotFound />} />
              </Routes>
            </StyledMain>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </StyledLayout>
  );
}

export default App;
