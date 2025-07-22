import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface OTPVerificationProps {
  onClose: () => void;
  onSubmit: (otp: string) => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ onClose, onSubmit }) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [countdown, setCountdown] = useState<number>(10);
  const [generatedOTP, setGeneratedOTP] = useState<string>('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Generate OTP on mount
  useEffect(() => {
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(newOTP);
    console.log('Generated OTP:', newOTP);
  }, []);

  // Countdown logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Only allow digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = () => {
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(newOTP);
    console.log('Resent OTP:', newOTP);
    setOtp(Array(6).fill(''));
    setCountdown(10);
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      console.log('Entered OTP:', otpString);
      console.log('Generated OTP:', generatedOTP);
      if (otpString === generatedOTP) {
        onSubmit(otpString);
      } else {
        alert('Invalid OTP');
      }
    } else {
      alert('Please enter complete OTP');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Verify Using OTP</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-6 text-center">
            Please enter the OTP received on customer's registered email ID
          </p>

          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                    inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-lg font-semibold focus:border-orange-500 focus:outline-none transition-colors"
              />
            ))}
          </div>

          <div className="text-center mb-6">
            {countdown > 0 ? (
              <span className="text-gray-600">
                Resend OTP in 00:{countdown.toString().padStart(2, '0')} seconds
              </span>
            ) : (
              <button
                onClick={handleResendOTP}
                className="ml-2 text-orange-500 hover:text-orange-600 font-medium underline"
              >
                Resend OTP
              </button>
            )}
          </div>

          <div className="text-center">
            <button
              onClick={handleSubmit}
              disabled={otp.some((digit) => digit === '')}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Submit
            </button>
          </div>

          {/* Debug Section */}
          <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-gray-600">
            <p><strong>Debug Info:</strong></p>
            <p>Generated OTP: {generatedOTP}</p>
            <p>Check console for OTP logs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
