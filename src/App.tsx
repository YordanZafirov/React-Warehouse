import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import styled from "styled-components";

import Footer from "./components/footer/Footer";
import Register from "./pages/Authentication/Register/Register";
import Login from "./pages/Authentication/Login/Login";
import Client from "./pages/Client/Client";
import Warehouse from "./pages/Warehouse/Warehouse";
import { route } from "./static/router/Routes";
import { AuthProvider } from "./context/AuthContext";
import ProductPage from "./pages/Product/ProductPage";
import { CartProvider } from "./context/CartContext";
import NotFound from "./pages/NotFound/NotFound";
import UpdateClient from "./pages/Client/UpdateClient/UpdateClient";
import UpdateProduct from "./pages/Product/UpdateProduct/UpdateProduct";
import UpdateWarehouse from "./pages/Warehouse/UpdateWarehouse/UpdateWarehouse";
import Invoice from "./pages/Invoice/Invoice";
import ListOrder from "./pages/Order/ListOrder";
import Report from "./pages/Report/Report";

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
                <Route path={route.updateClient} element={<UpdateClient />} />
                <Route path={route.product} element={<ProductPage />} />
                <Route path={route.updateProduct} element={<UpdateProduct />} />
                <Route path={route.warehouse} element={<Warehouse />} />
                <Route
                  path={route.updateWarehouse}
                  element={<UpdateWarehouse />}
                />
                <Route path={route.order} element={<ListOrder />} />
                <Route path={route.invoice} element={<Invoice />} />
                <Route path={route.report} element={<Report />} />
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
