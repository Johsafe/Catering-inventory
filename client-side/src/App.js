//Utils
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Loginin from "./Utils/signin";

//Admin Routes
import DashboardScreen from "./admin/Screens/DashboardScreen";
import ProductScreen from "./admin/Screens/ProductScreen";
import OrdersScreen from "./admin/Screens/OrdersScreen";
import TransactionScreen from "./admin/Screens/TransactionScreen";
import UsersScreen from "./admin/Screens/UsersScreen";
import SupplierScreen from "./admin/Screens/SupplierScreen";
import AddSupplier from "./admin/Screens/AddSupplier";
import EditSupplier from "./admin/Screens/EditSupplier";
import RecipeScreen from "./admin/Screens/RecipeScreen";
import AddRecipe from "./admin/Screens/AddRecipe";
import ViewRecipe from "./admin/Screens/ViewRecipe";
import AddProduct from "./admin/Screens/AddProduct";
import EditProductScreen from "./admin/Screens/EditProductScreen";
import MarkOrderScreen from "./admin/Screens/MarkOrderScreen";
import OutOfStock from "./admin/Screens/OutOfStock";
import Notifications from "./admin/Screens/NotificationScreen";
import FoodScreen from "./admin/Screens/FoodScreen";
import AddFoodScreen from "./admin/Screens/AddFoodScreen";
import EditFoodScreen from "./admin/Screens/EditFoodScreen";
import EditRecipeScreen from "./admin/Screens/EditRecipeScreen";

//Cashier Routes
import CashierDashboardScreen from "./cashier/Screens/DashboardScreen";
import CashierOrdersScreen from "./cashier/Screens/OrdersScreen";
import CashierProductScreen from "./cashier/Screens/ProductScreen";
import CashierSalesScreen from "./cashier/Screens/SalesScreen";
import CashierTransactionScreen from "./cashier/Screens/TransactionScreen";


export default function App() {
  let token = localStorage.getItem("token") ? true : false;

  return (
    <>
      <Router>
        <Routes>
          {/* Utils */}
          <Route path="/" element={<Loginin />} />
          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={token ? <DashboardScreen /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/admin-dashboard/product"
            element={token ? <ProductScreen /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/orders"
            element={token ? <OrdersScreen /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/transaction"
            element={token ? <TransactionScreen /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/users"
            element={token ? <UsersScreen /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/supplier"
            element={token ? <SupplierScreen /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/addsupplier"
            element={token ? <AddSupplier /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/:id/editsupplier"
            element={token ? <EditSupplier /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/recipe"
            element={token ? <RecipeScreen /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/addrecipe"
            element={token ? <AddRecipe /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/:id/viewrecipe"
            element={token ? <ViewRecipe /> : <Navigate to="/" />}
          />
           <Route
            path="/admin-dashboard/:id/editrecipe"
            element={token ? <EditRecipeScreen /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/add"
            element={token ? <AddProduct /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/:id/edit"
            element={token ? <EditProductScreen /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/:id/orders/mark"
            element={token ? <MarkOrderScreen /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/out-of-stock"
            element={token ? <OutOfStock /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/notification"
            element={token ? <Notifications /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/foods"
            element={token ? <FoodScreen /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/addfood"
            element={token ? <AddFoodScreen /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/:id/editfood"
            element={token ? <EditFoodScreen /> : <Navigate to="/" />}
          />

          {/* Cashier Routes */}
          <Route
            path="/cashier-dashboard"
            element={token ? <CashierDashboardScreen /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/cashier-dashboard/product"
            element={token ? <CashierProductScreen /> : <Navigate to="/" />}
          />
          <Route
            path="/cashier-dashboard/sales"
            element={token ? <CashierSalesScreen /> : <Navigate to="/" />}
          />
          <Route
            path="/cashier-dashboard/transaction"
            element={token ? <CashierTransactionScreen /> : <Navigate to="/" />}
          />
          <Route
            path="/cashier-dashboard/orders"
            element={token ? <CashierOrdersScreen /> : <Navigate to="/" />}
          />

          {/* Chef Routes */}
          <Route path="/chef-dashboard">Chef Dashboard</Route>
        </Routes>
      </Router>
    </>
  );
}
