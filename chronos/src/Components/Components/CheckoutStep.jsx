import React from "react";

const CheckoutStep = ({ step = 1 }) => {
  const steps = ["Shipping", "Payment", "Review"];

  return (
    <div className="flex items-center gap-3 text-[8px]">
      {steps.map((name, index) => {
        const stepNumber = index + 1;
        const isActive = step === stepNumber;
        const isCompleted = step > stepNumber;

        return (
          <React.Fragment key={name}>
            <div
              className={`flex items-center gap-1.5 ${
                isActive || isCompleted ? "text-black" : "text-gray-400"
              }`}
            >
              <span
                className={`flex h-3 w-3 items-center justify-center rounded-full text-[7px] ${
                  isActive || isCompleted
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-300 text-white"
                }`}
              >
                {isCompleted ? "✓" : stepNumber}
              </span>

              <span>{name}</span>
            </div>

            {index < steps.length - 1 && (
              <div className="h-px w-6 bg-gray-300" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CheckoutStep;
