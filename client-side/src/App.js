import AdminRouter from "./admin/Utils/AdminRouter";
import CashierRouter from "./cashier/Utils/cashierRouter";



export default function App() {
  return (
    <>
      <AdminRouter/>
      {/* <ClientRouter/> */}
      <CashierRouter/>
    </>
  )

}