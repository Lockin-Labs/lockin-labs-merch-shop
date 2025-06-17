
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  cartItems: any[];
  onCartClick: () => void;
}

const Header = ({ cartItems, onCartClick }: HeaderProps) => {
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 w-full bg-gray-950/95 backdrop-blur-md border-b border-cyan-500/20 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-gray-950 font-bold text-sm">LL</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Lockin-Labs
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className="hover:text-cyan-400 transition-colors">Home</a>
          <a href="#products" className="hover:text-cyan-400 transition-colors">Products</a>
          <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
        </nav>

        <Button
          variant="outline"
          size="sm"
          onClick={onCartClick}
          className="relative border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Cart
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-cyan-500 text-gray-950 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {itemCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
