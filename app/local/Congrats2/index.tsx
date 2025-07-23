import React from "react";
import Button from "../../components/Button/index";

const TransferSuccessful = ({
  successImage = null,
  fundingAmount = "90,000.00",
  onGoHome = () => console.log("Go to Home clicked"),
}) => {
  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString("en-GB");
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${date}, ${time}`;
  };

  const generateTransactionId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const transactionId = generateTransactionId();
  const currentDateTime = getCurrentDateTime();

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-full h-auto lg:max-w-[1200px] lg:h-[600px] p-8 flex flex-col justify-between overflow-auto">
        {/* TOP SECTION */}
        <div className="bg-gray-200 rounded-xl p-6 mb-6">
          <div className="flex justify-center mb-4">
            <img
              src="../assets/images/Succes.gif"
              alt="Success Animation"
              className="w-32 h-32"
            />
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Transfer Successful
            </h2>
            <p className="text-gray-600 text-sm">
              Funds have been added to your account!
            </p>
          </div>
        </div>

        {/* TRANSACTION INFO */}
        <div className="rounded-xl border border-black p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Transaction Information
          </h3>
          <hr className="border-black mb-4" />

          <div className="grid grid-cols-4 gap-6 items-center text-sm text-gray-900">
            {/* Transaction ID */}
            <div>
              <p className="text-xs text-gray-500 mb-1">Transaction ID</p>
              <div className="flex items-center gap-1">
                <p className="font-medium">{transactionId}</p>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-orange-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M15 8a1 1 0 011 1v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a1 1 0 112 0v2h8V9a1 1 0 011-1z" />
                    <path d="M11 2a1 1 0 011 1v9a1 1 0 11-2 0V4H6a1 1 0 110-2h5z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Funding Amount */}
            <div>
              <p className="text-xs text-gray-500 mb-1">Funding Amount</p>
              <p className="font-medium">₹{fundingAmount}</p>
            </div>

            {/* Completed On */}
            <div>
              <p className="text-xs text-gray-500 mb-1">Completed On</p>
              <p className="font-medium">{currentDateTime}</p>
            </div>

            {/* Payment Mode */}
            <div>
              <p className="text-xs text-gray-500 mb-1">Payment Mode</p>
              <p className="font-semibold">IMPS</p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-2 flex justify-center">
          <Button
            onClick={onGoHome}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-lg font-medium transition-colors duration-200"
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransferSuccessful;
