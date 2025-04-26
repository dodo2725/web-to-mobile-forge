
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface UrlInputProps {
  onUrlSubmit: (url: string) => void;
}

const UrlInput = ({ onUrlSubmit }: UrlInputProps) => {
  const [url, setUrl] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const validateAndSubmit = () => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }
    
    // Basic URL validation
    try {
      // Add https if not present
      let processedUrl = url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        processedUrl = 'https://' + url;
      }
      
      new URL(processedUrl);
      setIsValidating(true);
      
      // Simulate validation process
      setTimeout(() => {
        toast.success("URL validated successfully");
        onUrlSubmit(processedUrl);
        setIsValidating(false);
      }, 1500);
    } catch (error) {
      toast.error("Please enter a valid URL");
    }
  };

  return (
    <div className="w-full space-y-4">
      <h2 className="text-xl font-semibold">Enter Website URL</h2>
      <div className="flex gap-2 w-full">
        <Input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow"
        />
        <Button 
          onClick={validateAndSubmit} 
          disabled={isValidating}
          className="bg-forge-purple hover:bg-forge-vivid transition-colors"
        >
          {isValidating ? "Validating..." : "Start"}
        </Button>
      </div>
    </div>
  );
};

export default UrlInput;
