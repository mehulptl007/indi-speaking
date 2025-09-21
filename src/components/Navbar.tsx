import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent"></div>
          <h1 className="text-xl font-bold sacred-text">चारधाम</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-foreground hover:text-primary transition-colors">होम</a>
          <a href="/reels" className="text-foreground hover:text-primary transition-colors">रील्स</a>
          <a href="/places" className="text-foreground hover:text-primary transition-colors">स्थल</a>
          <a href="/gods" className="text-foreground hover:text-primary transition-colors">देवता</a>
          <a href="/scriptures" className="text-foreground hover:text-primary transition-colors">शास्त्र</a>
        </div>
        
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;