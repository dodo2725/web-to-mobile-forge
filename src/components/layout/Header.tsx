
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export const Header = () => {
  const { user } = useAuth();
  const [showAuthTip, setShowAuthTip] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const toggleAuthTip = () => {
    setShowAuthTip(!showAuthTip);
  };

  return (
    <header className="gradient-bg text-white px-6 py-8 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Web to Mobile Forge</h1>
          <p className="text-lg opacity-80">Transform any website into native mobile apps for Android and iOS</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {user ? (
            <Button onClick={handleLogout} variant="outline" className="text-white border-white hover:text-white">
              Log out
            </Button>
          ) : (
            <div className="flex flex-col items-end gap-2">
              <Button asChild variant="outline" className="text-white border-white hover:text-white">
                <Link to="/auth">Sign in</Link>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-white/70 hover:text-white px-0"
                onClick={toggleAuthTip}
              >
                Login issues?
              </Button>
              
              {showAuthTip && (
                <div className="bg-white text-gray-800 p-3 rounded-md shadow-md text-xs mt-1 max-w-xs">
                  <p className="font-semibold mb-1">If you're having trouble with login:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Check your spam folder for confirmation email</li>
                    <li>Try signing up again with the same email</li>
                    <li onClick={() => {
                      navigator.clipboard.writeText(window.location.origin);
                      toast.success("URL copied to clipboard");
                    }} className="cursor-pointer text-blue-600 hover:underline">
                      Copy site URL (for Supabase settings)
                    </li>
                  </ol>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
