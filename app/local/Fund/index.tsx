"use client";
import React, { useState } from "react";
import Card from "../../components/Card/index";
import Button from "../../components/Button/index";
import TextBox from "../../components/TextBox/index";
import QRCodeGenerator from "../Qr/index";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FundingPage() {
  const [fundingAmount, setFundingAmount] = useState("₹");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrData, setQrData] = useState("");

  const [isUpiValid, setIsUpiValid] = useState(false);
  const [proBut, setProBut] = useState(false);
  
  const quickAmounts = ["₹10,000.00", "₹50,000.00", "₹90,000.00"];

  const isValidUpiId = (upi: string) => {
    const upiRegex = /^[\w.-]{2,256}@[a-zA-Z]{2,64}$/;
    return upiRegex.test(upi);
  };
  const handleUpiChange = (value: string) => {
    setUpiId(value);
    setIsUpiValid(isValidUpiId(value));
  };
  const handleQuickAmountSelect = (amount: string) => {
    setFundingAmount(amount);
  };

  const handleVerify = () => {
    console.log("Verifying UPI ID:", upiId);
  };

  const handleGenerateQRCode = () => {
    setQrData(`Pay ₹${fundingAmount} to Fund Your Account`);
    setProBut(true)
    setShowQRModal(true);
  };

  const handleCloseModal = () => {
    setShowQRModal(false);
  };

  const payeeName = "MerchantName";
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${fundingAmount}&cu=INR`;
  const formatPaymentMethodLabel = (method: string) => {
    switch (method) {
      case "upi":
        return "UPI ID";
      case "Cheque":
        return "Cheque";
      case "Link":
        return "Link";
      default:
        return method;
    }
  };
  const router = useRouter();
  const handleProceed = () => {
    console.log("Proceeding to next step");
    router.push("/Congratulations2"); // Navigate to the Add Funds page
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-5xl mx-auto p-6 space-y-6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-4">
            {/* Funding Amount */}
            <Card className="w-full max-w-[808px] min-h-[295px] p-4 md:mx-auto mb-6">
              <h2 className="text-md font-semibold text-gray-800 mb-3">
                Funding Amount
              </h2>

              <TextBox
                label="Amount"
                placeholder="Enter funding amount"
                value={fundingAmount}
                onChange={setFundingAmount}
                required
              />

              <p className="text-sm text-gray-600 mt-4 mb-2">
                Select Prescribed Rupees
              </p>
              <div className="flex flex-wrap gap-2">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleQuickAmountSelect(amount)}
                    className="px-3 py-1.5 border border-gray-300 rounded-full text-sm hover:bg-gray-50"
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="w-full max-w-[808px] min-h-[295px] p-4 md:mx-auto">
              <h2 className="text-md font-semibold text-gray-800 mb-3">
                Payment Method
              </h2>

              <div className="flex gap-4 mb-4">
                {["upi", "Cheque", "Link"].map((method) => (
                  <label key={method} className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2 text-[#02836C]"
                    />
                    <span className="text-sm text-gray-700">
                      {formatPaymentMethodLabel(method)}
                    </span>
                  </label>
                ))}
              </div>

              {paymentMethod === "upi" && (
                <div className="mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      UPI ID <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2 items-center">
                      <TextBox
                        label=""
                        placeholder="Enter UPI ID"
                        type="text"
                        value={upiId}
                        onChange={handleUpiChange}
                        className="w-full sm:w-[380px]"
                      />
                      <div className="pb-5">
                        <Button
                          onClick={handleVerify}
                          disabled={!isUpiValid}
                          className={`px-4 py-2 rounded-3xl  w-1/2 text-white ${
                            isUpiValid
                              ? "bg-orange-500 hover:bg-orange-600"
                              : "bg-gray-400 cursor-not-allowed"
                          }`}
                        >
                          Verify
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={handleGenerateQRCode}
                     
                      className={"px-4 py-2 rounded-md text-white bg-orange-500"                        
                      }
                    >
                      Generate QR Code
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4 !bg-gray-200">
              <h2 className="text-md font-semibold text-gray-800 mb-3">
                Funding Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Funding Amount</span>
                  <span className="font-medium text-gray-800">
                    {fundingAmount}
                  </span>
                </div>
                <hr className="border-gray-400" />
                <div className="flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span>{fundingAmount}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>
      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/75  flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            {/* Modal Content */}
            <div className="text-center">
              <div className="mb-4 pl-24">
                <QRCodeGenerator data={upiUrl} size={200} />
              </div>

              <h3 className="text-lg font-semibold mb-2">
                Pay {fundingAmount} to Fund Your Account
              </h3>

              <p className="text-gray-600 text-sm mb-6">
                Scan the QR code below with your mobile banking app or UPI app
                to complete the payment.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex justify-end mt-6 px-4">
        <button
          disabled={!isUpiValid && !proBut} 
          onClick={handleProceed}
          className={`w-1/6   px-4 py-3 rounded-3xl text-white ${
            isUpiValid || proBut
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Proceed
        </button>
      </div>
    </div>
  );
}
