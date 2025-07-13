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

        // Try to fetch from Supabase Edge Function first
        const { data, error } = await supabase.functions.invoke('fetch-printify-products');
        
        if (error) {
          console.warn('Failed to fetch from Printify API:', error);
          // Use sample products as fallback
          setProducts(getSampleProducts());
        } else if (data && data.products) {
          setProducts(data.products);
        } else {
          // Use sample products as fallback
          setProducts(getSampleProducts());
        }

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
    name: 'Women\'s Tee - REVERSED #DKmFKnVibe Hoodlum/Original Keyboard Gangsta',
    description: 'Women\'s t-shirt with keyboard gangsta design',
    price: 25.75,
    image_url: 'https://images-api.printify.com/mockup/683f09d81dc6e5f06a0c1e7b/12022/102005/womens-tee-reversed-dkmfknvibe-hoodlum.jpg',
    category: 'Women',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy'],
    stock: 100,
    featured: false,
  },
  {
    id: '4',
    name: 'Unisex Hoodie - REVERSED #DKmFKnVibe Hoodlum/Original Keyboard Gangsta',
    description: 'Unisex hoodie with keyboard gangsta design',
    price: 49.99,
    image_url: 'https://images-api.printify.com/mockup/683f0a12910b4258be0bf35f/12025/102005/unisex-hoodie-reversed-dkmfknvibe-hoodlum.jpg',
    category: 'Unisex',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy'],
    stock: 100,
    featured: false,
  },
  {
    id: '5',
    name: 'Tank Top - REVERSED #DKmFKnVibe Hoodlum/Original Keyboard Gangsta',
    description: 'Tank top with keyboard gangsta design',
    price: 22.99,
    image_url: 'https://images-api.printify.com/mockup/683f0a50910b4258be0bf360/12024/102005/tank-top-reversed-dkmfknvibe-hoodlum.jpg',
    category: 'Unisex',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White'],
    stock: 100,
    featured: false,
  },
  {
    id: '6',
    name: 'Long Sleeve Tee - REVERSED #DKmFKnVibe Hoodlum/Original Keyboard Gangsta',
    description: 'Long sleeve t-shirt with keyboard gangsta design',
    price: 32.99,
    image_url: 'https://images-api.printify.com/mockup/683f0a85910b4258be0bf361/12023/102005/long-sleeve-tee-reversed-dkmfknvibe-hoodlum.jpg',
    category: 'Unisex',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Grey'],
    stock: 100,
    featured: false,
  },
];