
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

interface ProductModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: any) => void;
}

const ProductModal = ({ product, isOpen, onClose, onAddToCart }: ProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState('M');
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart({ ...product, size: selectedSize });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cyan-400">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-300">{product.description}</p>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-cyan-400">Size</label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-2 rounded border transition-colors ${
                      selectedSize === size 
                        ? 'bg-cyan-500 text-gray-950 border-cyan-500' 
                        : 'border-gray-600 hover:border-cyan-400 text-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="pt-4">
              <div className="text-3xl font-bold text-cyan-400 mb-4">${product.price}</div>
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 py-3"
                size="lg"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Cart - {selectedSize}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
