// import "../App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import DashboardScreen from "../Screens/DashboardScreen";
import ProductScreen from "../Screens/ProductScreen";
import SalesScreen from "../Screens/SalesScreen";
import TransactionScreen from "../Screens/TransactionScreen";
import OrdersScreen from "../Screens/OrdersScreen";

//screens

function CashierRouter() {
  let token = localStorage.getItem("token") ? true : false;

  return (
    <div>
      <ToastContainer position="top-right" limit={1} />
      <Router>
        <Routes>
          {/* <Route
            path="/"
            element={!token ? <Loginin /> : <Navigate to="/" />}
          /> */}
          <Route
            path="/cashier/dashboard"
            element={token ? <DashboardScreen /> : <Navigate to="/login" />}
          />
          <Route
            path="/cashier/product"
            element={token ? <ProductScreen /> : <Navigate to="/login" />}
          />
          <Route
            path="/cashier/sales"
            element={token ? <SalesScreen /> : <Navigate to="/login" />}
          />
          <Route
            path="/cashier/transaction"
            element={token ? <TransactionScreen /> : <Navigate to="/login" />}
          />
          <Route
            path="/cashier/orders"
            element={token ? <OrdersScreen /> : <Navigate to="/login" />}
          />
          {/* <Route
            path="/orders"
            element={token ? <SalesScreen/> : <Navigate to="/login" />}
          />
          <Route
            path="/transaction"
            element={token ? <TransactionScreen /> : <Navigate to="/login" />}
          /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default CashierRouter;
