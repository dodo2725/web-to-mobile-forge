
import { Button } from "@/components/ui/button";
import { ConversionStep } from "@/components/ConversionSteps";
import ConversionSteps from "@/components/ConversionSteps";
import { Download, ChevronsRight, Settings } from "lucide-react";
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

  const handleTestInBrowser = () => {
    toast.success("Testing conversion in browser...");
    setTimeout(() => {
      toast.info("In a production environment, this would launch a browser-based preview of your app.");
    }, 1500);
  };

  const handleRealDeviceInfo = () => {
    toast.info("To test on a real device:", {
      duration: 6000,
    });
    
    setTimeout(() => {
      toast.info("1. Export this project to GitHub", {
        duration: 6000,
      });
    }, 1000);
    
    setTimeout(() => {
      toast.info("2. Clone repo & run: npm install", {
        duration: 6000,
      });
    }, 2000);
    
    setTimeout(() => {
      toast.info("3. Add platform: npx cap add android/ios", {
        duration: 6000,
      });
    }, 3000);
    
    setTimeout(() => {
      toast.info("4. Build & sync: npm run build && npx cap sync", {
        duration: 6000,
      });
    }, 4000);
    
    setTimeout(() => {
      toast.info("5. Open & run: npx cap open android/ios", {
        duration: 6000,
      });
    }, 5000);
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

      <div className="pt-4 flex flex-col gap-4">
        {completed && (
          <>
            <Button onClick={handleDownload} className="flex-1 bg-forge-purple hover:bg-forge-vivid">
              <Download className="mr-2 h-4 w-4" />
              Download App
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button onClick={handleTestInBrowser} variant="outline" className="flex items-center justify-center">
                <ChevronsRight className="mr-2 h-4 w-4" />
                Test in Browser
              </Button>
              
              <Button onClick={handleRealDeviceInfo} variant="outline" className="flex items-center justify-center">
                <Settings className="mr-2 h-4 w-4" />
                Real Device Testing
              </Button>
            </div>
          </>
        )}

        <Button onClick={onReset} variant={completed ? "secondary" : "outline"} className="flex-1" disabled={converting}>
          Start Over
        </Button>
      </div>
    </div>
  );
};
