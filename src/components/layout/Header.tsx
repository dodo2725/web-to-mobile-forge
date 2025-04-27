
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

export const Header = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
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
  );
};
