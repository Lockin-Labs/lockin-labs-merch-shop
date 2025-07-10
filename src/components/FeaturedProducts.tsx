
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';
import { usePrintifyProducts } from '@/hooks/usePrintifyProducts';

interface FeaturedProductsProps {
  onAddToCart: (product: any) => void;
}

const FeaturedProducts = ({ onAddToCart }: FeaturedProductsProps) => {
  const { products } = usePrintifyProducts();
  const featuredProducts = [
    ...products.filter(p => p.featured),
    {
      id: 1,
      name: "Vibe Check Hoodie",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
      description: "Premium comfort for endless vibe coding sessions"
    },
    {
      id: 2,
      name: "Flow State Tee",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1583743814966-8936f37f8302?w=500&h=500&fit=crop",
      description: "Stay in the zone with maximum comfort"
    },
    {
      id: 3,
      name: "Tribe Energy Mug",
      price: 16.99,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&h=500&fit=crop",
      description: "Fuel your vibe coding adventures"
    }
  ];

  const handleAddToCart = (product) => {
    onAddToCart({ ...product, size: 'M' });
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Vibe Essentials
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Essential gear for the vibe tribe family</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="bg-gray-900/50 border-gray-800 hover:border-cyan-500/50 transition-all duration-300 group">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                   <img 
                     src={(product as any).image_url || (product as any).image} 
                     alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">{product.name}</h3>
                  <p className="text-gray-400 mb-4">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-cyan-400">${product.price}</span>
                    <Button 
                      onClick={() => handleAddToCart(product)}
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
    </section>
  );
};

export default FeaturedProducts;
