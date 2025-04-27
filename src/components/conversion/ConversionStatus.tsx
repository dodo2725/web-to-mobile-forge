
import { Button } from "@/components/ui/button";
import { ConversionStep } from "@/components/ConversionSteps";
import ConversionSteps from "@/components/ConversionSteps";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface ConversionStatusProps {
  converting: boolean;
  completed: boolean;
  conversionSteps: ConversionStep[];
  onReset: () => void;
}

export const ConversionStatus = ({ converting, completed, conversionSteps, onReset }: ConversionStatusProps) => {
  const handleDownload = () => {
    toast.success("Starting download...");
    setTimeout(() => {
      toast.info("This is a demo. In a real app, this would download your converted application.");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold mb-2">Conversion {completed ? "Complete" : "In Progress"}</h2>
        <p className="text-gray-500">
          {completed ? "Your app is ready to download!" : "Please wait while we convert your website..."}
        </p>
      </div>

      <ConversionSteps steps={conversionSteps} />

      <div className="pt-4 flex gap-4">
        {completed && (
          <Button onClick={handleDownload} className="flex-1 bg-forge-purple hover:bg-forge-vivid">
            <Download className="mr-2 h-4 w-4" />
            Download App
          </Button>
        )}

        <Button onClick={onReset} variant="outline" className="flex-1" disabled={converting}>
          Start Over
        </Button>
      </div>
    </div>
  );
};
