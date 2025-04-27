
import { useState } from 'react';
import { toast } from "sonner";
import UrlInput from "@/components/UrlInput";
import DevicePreview from "@/components/DevicePreview";
import AppSettings, { AppSettingsType } from "@/components/AppSettings";
import { ConversionStep } from "@/components/ConversionSteps";
import { useIsMobile } from "@/hooks/use-mobile";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ConversionStatus } from "@/components/conversion/ConversionStatus";

const Index = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [settings, setSettings] = useState<AppSettingsType | null>(null);
  const [converting, setConverting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const isMobile = useIsMobile();

  const [conversionSteps, setConversionSteps] = useState<ConversionStep[]>([
    {
      id: 1,
      title: "Website URL Validation",
      description: "Validate and prepare website for mobile conversion",
      status: "pending"
    },
    {
      id: 2,
      title: "App Configuration",
      description: "Set app name, icon and platform settings",
      status: "pending"
    },
    {
      id: 3,
      title: "Building App Container",
      description: "Creating mobile container for web content",
      status: "pending"
    },
    {
      id: 4,
      title: "Optimization & Packaging",
      description: "Optimizing assets and packaging the application",
      status: "pending"
    },
    {
      id: 5,
      title: "Finalizing Build",
      description: "Finalizing and preparing download package",
      status: "pending"
    }
  ]);

  const updateStepStatus = (stepId: number, status: ConversionStep["status"]) => {
    setConversionSteps(steps => 
      steps.map(step => 
        step.id === stepId ? { ...step, status } : step
      )
    );
  };

  const handleUrlSubmit = (validatedUrl: string) => {
    setUrl(validatedUrl);
    updateStepStatus(1, "completed");
    updateStepStatus(2, "active");
  };

  const handleSettingsSubmit = (appSettings: AppSettingsType) => {
    setSettings(appSettings);
    updateStepStatus(2, "completed");
    startConversion();
  };

  const startConversion = () => {
    setConverting(true);
    updateStepStatus(3, "active");
    
    // Simulate conversion process
    setTimeout(() => {
      updateStepStatus(3, "completed");
      updateStepStatus(4, "active");
      
      setTimeout(() => {
        updateStepStatus(4, "completed");
        updateStepStatus(5, "active");
        
        setTimeout(() => {
          updateStepStatus(5, "completed");
          setConverting(false);
          setCompleted(true);
          toast.success("App conversion completed successfully!");
        }, 3000);
      }, 4000);
    }, 3000);
  };

  const resetConversion = () => {
    setUrl(null);
    setSettings(null);
    setConverting(false);
    setCompleted(false);
    setConversionSteps(steps => 
      steps.map(step => ({ ...step, status: "pending" }))
    );
    toast.info("Conversion process reset");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'} gap-8`}>
          <div className={`${isMobile ? '' : 'lg:col-span-2'} space-y-8`}>
            <div className="bg-white rounded-lg shadow-md p-6">
              {!url && <UrlInput onUrlSubmit={handleUrlSubmit} />}
              {url && !settings && <AppSettings onSubmit={handleSettingsSubmit} />}
              {url && settings && (
                <ConversionStatus
                  converting={converting}
                  completed={completed}
                  conversionSteps={conversionSteps}
                  onReset={resetConversion}
                />
              )}
            </div>
          </div>
          
          <div className={`${isMobile ? 'order-first' : ''} flex justify-center`}>
            <DevicePreview url={url} isConverting={converting} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
