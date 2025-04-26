
import { useEffect, useState } from "react";

interface DevicePreviewProps {
  url: string | null;
  isConverting: boolean;
}

const DevicePreview = ({ url, isConverting }: DevicePreviewProps) => {
  const [loadingState, setLoadingState] = useState<'initial' | 'loading' | 'rendered'>('initial');

  useEffect(() => {
    if (url) {
      setLoadingState('loading');
      // Simulate loading time
      const timer = setTimeout(() => {
        setLoadingState('rendered');
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setLoadingState('initial');
    }
  }, [url]);

  return (
    <div className="relative">
      <div className="device-frame">
        <div className="device-screen">
          {loadingState === 'initial' && (
            <div className="text-center p-6 text-gray-500">
              <div className="animate-float mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-forge-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm">Enter a URL to preview</p>
            </div>
          )}
          
          {loadingState === 'loading' && (
            <div className="flex flex-col items-center justify-center">
              <div className="animate-pulse-slow mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-forge-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">Loading preview...</p>
            </div>
          )}
          
          {loadingState === 'rendered' && (
            <div className="w-full h-full">
              {isConverting ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-forge-purple mx-auto"></div>
                    <p className="mt-4 text-sm text-gray-600">Converting to mobile app...</p>
                  </div>
                </div>
              ) : (
                <iframe 
                  src={url || 'about:blank'}
                  className="w-full h-full border-none"
                  title="Website Preview"
                  sandbox="allow-same-origin allow-scripts"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DevicePreview;
