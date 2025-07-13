import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { usePrintifyProducts } from '@/hooks/usePrintifyProducts';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Package, Shirt, Wrench } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface ProductSelection {
  productId: string;
  section: 'context_couture' | 'engineering_accessories' | 'vibe_graphics';
  isVisible: boolean;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const { products, loading } = usePrintifyProducts();
  const [selections, setSelections] = useState<ProductSelection[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (products.length > 0) {
      loadProductSelections();
    }
  }, [products]);

  const loadProductSelections = async () => {
    try {
      // For now, use local state since the table might not exist yet
      setSelections([]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleToggleProduct = async (productId: string, section: string, isVisible: boolean) => {
    // For now, just update local state
    setSelections(prev => {
      const existing = prev.find(s => s.productId === productId && s.section === section);
      if (existing) {
        return prev.map(s => 
          s.productId === productId && s.section === section 
            ? { ...s, isVisible } 
            : s
        );
      } else {
        return [...prev, { productId, section: section as any, isVisible }];
      }
    });

    toast({
      title: "Updated",
      description: "Product visibility updated successfully",
    });
  };

  const isProductVisible = (productId: string, section: string) => {
    return selections.find(s => s.productId === productId && s.section === section)?.isVisible || false;
  };

  const categorizeProducts = () => {
    const clothing = products.filter(p => 
      p.category?.toLowerCase().includes('shirt') ||
      p.category?.toLowerCase().includes('hoodie') ||
      p.category?.toLowerCase().includes('tee') ||
      p.name.toLowerCase().includes('shirt') ||
      p.name.toLowerCase().includes('hoodie') ||
      p.name.toLowerCase().includes('tee')
    );

    const accessories = products.filter(p => 
      !clothing.includes(p) &&
      !p.name.toLowerCase().includes('sticker') &&
      (p.category?.toLowerCase().includes('accessory') ||
       p.name.toLowerCase().includes('mug') ||
       p.name.toLowerCase().includes('cap') ||
       p.name.toLowerCase().includes('bag'))
    );

    const graphics = products.filter(p => 
      !clothing.includes(p) &&
      !accessories.includes(p) &&
      (p.name.toLowerCase().includes('sticker') ||
       p.name.toLowerCase().includes('graphic') ||
       p.name.toLowerCase().includes('print'))
    );

    return { clothing, accessories, graphics };
  };

  const { clothing, accessories, graphics } = categorizeProducts();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Admin Dashboard
            </span>
          </h1>
          <Button onClick={handleLogout} variant="outline" className="border-gray-700">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="context_couture" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900">
            <TabsTrigger value="context_couture" className="flex items-center gap-2">
              <Shirt className="w-4 h-4" />
              Context Couture
            </TabsTrigger>
            <TabsTrigger value="engineering_accessories" className="flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              Engineering Accessories
            </TabsTrigger>
            <TabsTrigger value="vibe_graphics" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Vibe Graphics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="context_couture" className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">Context Couture (Clothing)</h2>
              <p className="text-gray-400">Manage clothing items that appear in the featured section</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clothing.map((product) => (
                <Card key={product.id} className="bg-gray-900/50 border-gray-800">
                  <CardHeader className="pb-3">
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <Badge variant="secondary">${product.price}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`context-${product.id}`}
                        checked={isProductVisible(product.id, 'context_couture')}
                        onCheckedChange={(checked) => 
                          handleToggleProduct(product.id, 'context_couture', checked)
                        }
                      />
                      <Label htmlFor={`context-${product.id}`}>Show in Context Couture</Label>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="engineering_accessories" className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">Engineering Accessories</h2>
              <p className="text-gray-400">Manage accessories and tools for developers</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {accessories.map((product) => (
                <Card key={product.id} className="bg-gray-900/50 border-gray-800">
                  <CardHeader className="pb-3">
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <Badge variant="secondary">${product.price}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`engineering-${product.id}`}
                        checked={isProductVisible(product.id, 'engineering_accessories')}
                        onCheckedChange={(checked) => 
                          handleToggleProduct(product.id, 'engineering_accessories', checked)
                        }
                      />
                      <Label htmlFor={`engineering-${product.id}`}>Show in Engineering Accessories</Label>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vibe_graphics" className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">Vibe Graphics</h2>
              <p className="text-gray-400">Manage graphic designs and visual elements</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {graphics.map((product) => (
                <Card key={product.id} className="bg-gray-900/50 border-gray-800">
                  <CardHeader className="pb-3">
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <Badge variant="secondary">${product.price}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`graphics-${product.id}`}
                        checked={isProductVisible(product.id, 'vibe_graphics')}
                        onCheckedChange={(checked) => 
                          handleToggleProduct(product.id, 'vibe_graphics', checked)
                        }
                      />
                      <Label htmlFor={`graphics-${product.id}`}>Show in Vibe Graphics</Label>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;