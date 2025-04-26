
import { CheckIcon } from "lucide-react";

export type ConversionStep = {
  id: number;
  title: string;
  description: string;
  status: "pending" | "active" | "completed" | "error";
};

interface ConversionStepsProps {
  steps: ConversionStep[];
}

const ConversionSteps = ({ steps }: ConversionStepsProps) => {
  return (
    <div className="w-full py-4">
      <h2 className="text-xl font-semibold mb-6">Conversion Steps</h2>
      
      <div className="relative">
        {steps.map((step, index) => (
          <div key={step.id} className="step-item relative pl-10 pb-12">
            <div className="step-connector"></div>
            <div 
              className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step.status === "completed" 
                  ? "bg-forge-purple border-forge-purple text-white"
                  : step.status === "active" 
                    ? "border-forge-purple bg-white text-forge-purple animate-pulse-slow"
                    : step.status === "error"
                      ? "border-red-500 bg-red-100 text-red-500"
                      : "border-gray-300 bg-white text-gray-300"
              }`}
            >
              {step.status === "completed" ? (
                <CheckIcon size={16} />
              ) : (
                <span className="text-sm">{index + 1}</span>
              )}
            </div>
            <div>
              <h3 className={`font-medium ${
                step.status === "active" ? "text-forge-purple" : 
                step.status === "completed" ? "text-forge-purple" :
                step.status === "error" ? "text-red-500" :
                "text-gray-500"
              }`}>{step.title}</h3>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversionSteps;
