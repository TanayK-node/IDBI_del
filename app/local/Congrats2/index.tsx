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
                    fill="none"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    strokeWidth="1.5"
                    stroke="orange"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                    />
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
