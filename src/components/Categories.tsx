
import { Card, CardContent } from '@/components/ui/card';
import { Shirt, ShoppingBag, Tags } from 'lucide-react';

const Categories = () => {
  const categories = [
    {
      name: "Hoodies & Sweatshirts",
      icon: Shirt,
      count: "12 items",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop"
    },
    {
      name: "T-Shirts & Tanks",
      icon: Shirt,
      count: "18 items", 
      image: "https://images.unsplash.com/photo-1583743814966-8936f37f8302?w=300&h=300&fit=crop"
    },
    {
      name: "Accessories",
      icon: ShoppingBag,
      count: "8 items",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop"
    },
    {
      name: "Stickers & Pins",
      icon: Tags,
      count: "15 items",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=300&fit=crop"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-900/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Shop by Category
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Find your perfect developer aesthetic</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center mb-2">
                      <category.icon className="w-5 h-5 text-cyan-400 mr-2" />
                      <span className="text-cyan-400 text-sm font-semibold">{category.count}</span>
                    </div>
                    <h3 className="text-white font-semibold text-lg">{category.name}</h3>
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

export default Categories;
