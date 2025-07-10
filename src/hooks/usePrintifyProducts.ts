import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
  printify_id?: string;
  printify_data?: any;
}

export const usePrintifyProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // For now, use sample products (matching your Printify store)
        // TODO: After running the SQL migration, uncomment the database integration
        setProducts(getSampleProducts());
        setLoading(false);

      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Use sample products as fallback
        setProducts(getSampleProducts());
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

// Sample products matching your Printify store
const getSampleProducts = (): Product[] => [
  {
    id: '1',
    name: 'Premium Organic Anti-Dummy Vibe-Gummies Adult Multivitamin (60 Gummies)',
    description: 'Premium organic multivitamin gummies for adults',
    price: 29.99,
    image_url: 'https://images-api.printify.com/mockup/684f02c6d504d7af62062d7a/109724/104966/premium-organic-anti-dummy-vibe-gummies-adult-multivitamin-60-gummies.jpg?camera_label=front&revision=1750009548630&s=400',
    category: 'Food - Health - Beauty',
    sizes: ['One Size'],
    colors: [],
    stock: 100,
    featured: true,
  },
  {
    id: '2',
    name: 'Unisex Tee - REVERSED #DKmFKnVibe Hoodlum/Original Keyboard Gangsta',
    description: 'Unisex t-shirt with keyboard gangsta design',
    price: 25.75,
    image_url: 'https://images-api.printify.com/mockup/683f0939910b4258be0bf35e/12022/102005/unisex-tee-reversed-dkmfknvibe-hoodlum.jpg',
    category: 'Men',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Red'],
    stock: 100,
    featured: true,
  },
  {
    id: '3',
    name: '#VibeOrDie Desk Mat | Matrix Edition',
    description: 'Gaming desk mat with matrix-style design',
    price: 19.99,
    image_url: 'https://images-api.printify.com/mockup/683f5e7d6b3c2e1d1e0c8f5a/67890/12345/vibeorodie-desk-mat-matrix-edition.jpg',
    category: 'Accessories',
    sizes: ['One Size'],
    colors: ['Matrix Green'],
    stock: 100,
    featured: false,
  },
  {
    id: '4',
    name: 'Keyboard Hoodlum Stickers',
    description: 'Personalized stickers for keyboard enthusiasts',
    price: 5.00,
    image_url: '/placeholder.svg',
    category: 'Personalized',
    sizes: ['One Size'],
    colors: ['Various'],
    stock: 100,
    featured: false,
  },
];