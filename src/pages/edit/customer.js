import CustomerInfo from "src/components/customer/customer-info";
import { DashboardLayout } from '../../components/dashboard-layout';
const EditCutomer = () => {

  return (
    <>
      <CustomerInfo />
    </>
  )
}
EditCutomer.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
export default EditCutomer;