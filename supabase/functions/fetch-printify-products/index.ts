import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const printifyApiKey = Deno.env.get('PRINTIFY_API_KEY')
    const shopId = Deno.env.get('PRINTIFY_SHOP_ID')
    
    if (!printifyApiKey || !shopId) {
      throw new Error('Missing Printify API credentials')
    }

    // Fetch products from Printify API
    const response = await fetch(`https://api.printify.com/v1/shops/${shopId}/products.json`, {
      headers: {
        'Authorization': `Bearer ${printifyApiKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Printify API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Transform Printify products to match our database schema
    const transformedProducts = data.data.map((product: any) => ({
      id: product.id,
      name: product.title,
      description: product.description || product.title,
      price: product.variants[0]?.price || 0,
      image_url: product.images[0]?.src || '/placeholder.svg',
      category: product.tags.join(', ') || 'General',
      sizes: product.variants.map((v: any) => v.options?.size).filter(Boolean),
      colors: product.variants.map((v: any) => v.options?.color).filter(Boolean),
      stock: 100, // Printify handles stock
      featured: product.tags.includes('featured'),
      printify_id: product.id,
      printify_data: product // Store full Printify data for orders
    }))

    return new Response(
      JSON.stringify({ products: transformedProducts }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error fetching Printify products:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})