
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';
import ProductModal from './ProductModal';

interface ProductGridProps {
  onAddToCart: (product: any) => void;
}

const ProductGrid = ({ onAddToCart }: ProductGridProps) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 4,
      name: "Vibe or Die Hoodie",
      price: 52.99,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
      description: "For those who live and breathe the vibe",
      category: "Hoodies"
    },
    {
      id: 5,
      name: "Code & Vibes Tee",
      price: 22.99,
      image: "https://images.unsplash.com/photo-1583743814966-8936f37f8302?w=500&h=500&fit=crop",
      description: "Perfect balance of style and comfort",
      category: "T-Shirts"
    },
    {
      id: 6,
      name: "Tribe Leader Tee",
      price: 26.99,
      image: "https://images.unsplash.com/photo-1583743814966-8936f37f8302?w=500&h=500&fit=crop",
      description: "Lead your squad with style",
      category: "T-Shirts"
    },
    {
      id: 7,
      name: "Flow State Zip-up",
      price: 48.99,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
      description: "Stay warm while coding in the zone",
      category: "Hoodies"
    },
    {
      id: 8,
      name: "Vibe Tribe Cap",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
      description: "Rep the tribe wherever you go",
      category: "Accessories"
    },
    {
      id: 9,
      name: "Vibe Sticker Pack",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=500&fit=crop",
      description: "Spread the vibe energy everywhere",
      category: "Stickers"
    }
  ];

  return (
    <section id="products" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              All Vibe Gear
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Complete your vibe coder wardrobe</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="bg-gray-900/50 border-gray-800 hover:border-cyan-500/50 transition-all duration-300 group cursor-pointer">
              <CardContent className="p-0">
                <div className="relative overflow-hidden" onClick={() => setSelectedProduct(product)}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-cyan-500/90 text-gray-950 px-2 py-1 rounded text-xs font-semibold">
                      {product.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">{product.name}</h3>
                  <p className="text-gray-400 mb-4 text-sm">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-cyan-400">${product.price}</span>
                    <Button 
                      onClick={() => onAddToCart({ ...product, size: 'M' })}
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ProductModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={onAddToCart}
      />
    </section>
  );
};

export default ProductGrid;
