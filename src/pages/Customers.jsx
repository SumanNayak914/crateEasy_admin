import CustomerStats from "../components/Customer/CustomerStats";
import CustomerTable from "../components/Customer/CustomerTable";

export default function Customers() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 space-y-6">
      
      <CustomerStats />
       <CustomerTable />
    </div>
  );
}
