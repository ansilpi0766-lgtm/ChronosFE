import React from "react";

const CheckoutStep = ({ step = 1 }) => {
  const steps = ["Shipping", "Payment", "Review"];

  return (
    <div className="flex items-center gap-4 text-base">
      {steps.map((name, index) => {
        const stepNumber = index + 1;
        const isActive = step === stepNumber;
        const isCompleted = step > stepNumber;

        return (
          <React.Fragment key={name}>
            <div
              className={`flex items-center gap-2 ${
                isActive || isCompleted ? "text-black" : "text-gray-400"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                  isActive || isCompleted
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-300 text-white"
                }`}
              >
                {isCompleted ? "✓" : stepNumber}
              </span>

              <span className="text-base font-semibold">{name}</span>
            </div>

            {index < steps.length - 1 && (
              <div className="h-px w-8 bg-gray-300" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CheckoutStep;
