import { useCustomer } from "../../../context/CustDetail";
import Card from "../../components/Card/index"; // Ensure this path is correct


const CustomerDetailsDisplay: React.FC = () => {
  const { customerData } = useCustomer();
  console.log("Rendering with customerData:", customerData);

  // Only render if customer details are verified
  console.log(customerData.name)
  console.log(customerData.mobile)
  console.log(customerData.email)

  return (
    <Card className="p-6">
      <div className="space-y-4">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Customer Details
        </h2>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Name
          </label>
          <div className="text-base font-medium text-gray-900">
            {customerData.name || "Not provided"}
          </div>
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="text-base font-medium text-gray-900">
            {customerData.mobile || "Not provided"}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email ID
          </label>
          <div className="text-base font-medium text-gray-900">
            {customerData.email || "Not provided"}
          </div>
        </div>
      </div>
    </div>
    </Card>
  );
};
export default CustomerDetailsDisplay;