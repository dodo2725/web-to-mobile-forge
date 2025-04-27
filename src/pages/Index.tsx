import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import UrlInput from "@/components/UrlInput";
import DevicePreview from "@/components/DevicePreview";
import AppSettings, { AppSettingsType } from "@/components/AppSettings";
import ConversionSteps from "@/components/ConversionSteps";
import { ConversionStep } from "@/components/ConversionSteps";
import { useIsMobile } from "@/hooks/use-mobile";
import { Download } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

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

  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleUrlSubmit = (validatedUrl: string) => {
    setUrl(validatedUrl);
    
    // Update step 1 to completed
    updateStepStatus(1, "completed");
    
    // Update step 2 to active
    updateStepStatus(2, "active");
  };

  const handleSettingsSubmit = (appSettings: AppSettingsType) => {
    setSettings(appSettings);
    
    // Update step 2 to completed
    updateStepStatus(2, "completed");
    
    // Start conversion process
    startConversion();
  };

  const updateStepStatus = (stepId: number, status: ConversionStep["status"]) => {
    setConversionSteps(steps => 
      steps.map(step => 
        step.id === stepId ? { ...step, status } : step
      )
    );
  };

  const startConversion = () => {
    setConverting(true);
    
    // Update step 3 to active
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

  const handleDownload = () => {
    toast.success("Starting download...");
    setTimeout(() => {
      toast.info("This is a demo. In a real app, this would download your converted application.");
    }, 2000);
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
      {/* Header */}
      <header className="gradient-bg text-white px-6 py-8 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Web to Mobile Forge</h1>
            <p className="text-lg opacity-80">Transform any website into native mobile apps for Android and iOS</p>
          </div>
          <div>
            {user ? (
              <Button onClick={handleLogout} variant="outline" className="text-white border-white hover:text-white">
                Log out
              </Button>
            ) : (
              <Button asChild variant="outline" className="text-white border-white hover:text-white">
                <Link to="/auth">Sign in</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'} gap-8`}>
          
          {/* Left column - Controls */}
          <div className={`${isMobile ? '' : 'lg:col-span-2'} space-y-8`}>
            <div className="bg-white rounded-lg shadow-md p-6">
              {!url && (
                <UrlInput onUrlSubmit={handleUrlSubmit} />
              )}
              
              {url && !settings && (
                <AppSettings onSubmit={handleSettingsSubmit} />
              )}
              
              {url && settings && (
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h2 className="text-xl font-semibold mb-2">Conversion {completed ? "Complete" : "In Progress"}</h2>
                    <p className="text-gray-500">{completed ? "Your app is ready to download!" : "Please wait while we convert your website..."}</p>
                  </div>
                  
                  <ConversionSteps steps={conversionSteps} />
                  
                  <div className="pt-4 flex gap-4">
                    {completed && (
                      <Button 
                        onClick={handleDownload} 
                        className="flex-1 bg-forge-purple hover:bg-forge-vivid"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download App
                      </Button>
                    )}
                    
                    <Button 
                      onClick={resetConversion} 
                      variant="outline" 
                      className="flex-1"
                      disabled={converting}
                    >
                      Start Over
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right column - Preview */}
          <div className={`${isMobile ? 'order-first' : ''} flex justify-center`}>
            <DevicePreview url={url} isConverting={converting} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-forge-dark text-gray-300 mt-12 py-6 px-4">
        <div className="container mx-auto text-center">
          <p className="mb-2">Web to Mobile Forge - Convert websites to mobile apps easily</p>
          <p className="text-sm opacity-60">This is a demonstration application</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
