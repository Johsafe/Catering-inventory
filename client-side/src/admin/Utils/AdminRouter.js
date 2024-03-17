// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";

// //screens
// import DashboardScreen from "../Screens/DashboardScreen";
// import ProductScreen from "../Screens/ProductScreen";
// import OrdersScreen from "../Screens/OrdersScreen";
// import UsersScreen from "../Screens/UsersScreen";
// import TransactionScreen from "../Screens/TransactionScreen";
// import AddProduct from "../Screens/AddProduct";
// import EditProductScreen from "../Screens/EditProductScreen";
// import MarkOrderScreen from "../Screens/MarkOrderScreen";
// import OutOfStock from "../Screens/OutOfStock";
// import Loginin from "../auth/signin";
// import SupplierScreen from "../Screens/SupplierScreen";
// import RecipeScreen from "../Screens/RecipeScreen";
// import AddSupplier from "../Screens/AddSupplier";
// import EditSupplier from "../Screens/EditSupplier";
// import AddRecipe from "../Screens/AddRecipe";
// import ViewRecipe from "../Screens/ViewRecipe";
// import Notifications from "../Screens/NotificationScreen";
// import AddFoodScreen from "../Screens/AddFoodScreen";
// import FoodScreen from "../Screens/FoodScreen";
// import EditFoodScreen from "../Screens/EditFoodScreen";

// function AdminRouter() {
//   let token = localStorage.getItem("token") ? true : false;

//   return (
//     <div>
//       <ToastContainer position="top-right" limit={1} />
//       {/* <Router> */}
//         {/* <Routes>
//            <Route
//             path="/login"
//             element={!token ? <Loginin /> : <Navigate to="/dashboard" />}
//           />
//           <Route
//             path="/"
//             element={token ? <DashboardScreen /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/product"
//             element={token ? <ProductScreen /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/orders"
//             element={token ? <OrdersScreen /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/transaction"
//             element={token ? <TransactionScreen /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/users"
//             element={token ? <UsersScreen /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/supplier"
//             element={token ? <SupplierScreen /> : <Navigate to="/login" />}
//           />
//            <Route
//             path="/addsupplier"
//             element={token ? <AddSupplier /> : <Navigate to="/login" />}
//           />
//            <Route
//             path="/:id/editsupplier"
//             element={token ? <EditSupplier /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/recipe"
//             element={token ? <RecipeScreen /> : <Navigate to="/login" />}
//           />
//            <Route
//             path="/addrecipe"
//             element={token ? <AddRecipe/> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/:id/viewrecipe"
//             element={token ? <ViewRecipe/> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/add"
//             element={token ? <AddProduct /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/:id/edit"
//             element={token ? <EditProductScreen /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/:id/orders/mark"
//             element={token ? <MarkOrderScreen /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/out-of-stock"
//             element={token ? <OutOfStock /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/notification"
//             element={token ? <Notifications/> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/foods"
//             element={token ? <FoodScreen/> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/addfood"
//             element={token ? <AddFoodScreen/> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/:id/editfood"
//             element={token ? <EditFoodScreen/> : <Navigate to="/login" />}
//           />
//           <Route
//             path="*"
//             element={<div>
//               Page Not Found
//             </div>}
//           />
//         </Routes> */}
//       {/* </Router> */}

//       <Routes>
//       {/* Define routes for admin dashboard and other screens */}
//       <Route path="/" element={token ? <DashboardScreen /> : <Navigate to="/" />} />
      
//     </Routes>
//     </div>
//   );
// }

// export default AdminRouter;
