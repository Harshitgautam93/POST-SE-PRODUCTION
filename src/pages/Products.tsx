import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Play, Heart, Share2, ShoppingCart } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { CartSheet } from "@/components/cart/CartSheet";
import { toast } from "@/hooks/use-toast";
import { auth } from "@/lib/auth";

const Products = () => {
  const { products: storeProducts, addToCart } = useAppStore();

  const handleAddToCart = (productId: string) => {
    const user = auth.getCurrentUser();
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to add items to cart"
      });
      return;
    }
    
    addToCart(user.id.toString(), productId, 1);
    toast({
      title: "Added to Cart",
      description: "Product has been added to your cart"
    });
  };
  
  // Enhanced products data with images
  const enhancedProducts = [
    {
      id: "1",
      name: "Wireless Premium Headphones",
      price: 299,
      category: "Technology",
      rating: 4.8,
      reviews: 342,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      description: "Premium wireless headphones with industry-leading noise cancellation",
      influencerContent: [
        { name: "Mike Chen", handle: "@techmikechen", contentType: "video", views: "45K", engagement: "4.2%" },
        { name: "Sarah Johnson", handle: "@sarahjstyle", contentType: "story", views: "23K", engagement: "5.1%" }
      ],
      features: ["Noise Cancellation", "30-hour battery", "Premium comfort"],
      conversionRate: "8.4%",
      inStock: true,
      tags: ["wireless", "audio", "premium"]
    },
    {
      id: "2",
      name: "Sustainable Fashion Jacket",
      price: 189,
      category: "Fashion",
      rating: 4.9,
      reviews: 187,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
      description: "Eco-friendly fashion jacket made from sustainable materials",
      influencerContent: [
        { name: "Emma Davis", handle: "@emmadavislife", contentType: "reel", views: "67K", engagement: "6.3%" },
        { name: "Sarah Johnson", handle: "@sarahjstyle", contentType: "post", views: "34K", engagement: "4.8%" }
      ],
      features: ["Eco-friendly materials", "Versatile design", "Durable construction"],
      conversionRate: "12.1%",
      inStock: true,
      tags: ["fashion", "sustainable", "jacket"]
    },
    {
      id: "3",
      name: "Organic Protein Powder",
      price: 79,
      category: "Health & Fitness",
      rating: 4.6,
      reviews: 523,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      description: "High-quality organic protein powder for fitness enthusiasts",
      influencerContent: [
        { name: "Alex Rodriguez", handle: "@alexfitness", contentType: "video", views: "89K", engagement: "7.2%" },
        { name: "Emma Davis", handle: "@emmadavislife", contentType: "story", views: "41K", engagement: "5.9%" }
      ],
      features: ["25g protein per serving", "No artificial additives", "Great taste"],
      conversionRate: "15.3%",
      inStock: true,
      tags: ["health", "protein", "organic"]
    },
    {
      id: "4",
      name: "Smart Fitness Watch",
      price: 349,
      category: "Technology",
      rating: 4.7,
      reviews: 891,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      description: "Advanced fitness tracking with heart rate monitoring and GPS",
      influencerContent: [
        { name: "Alex Rodriguez", handle: "@alexfitness", contentType: "review", views: "156K", engagement: "8.1%" },
        { name: "Mike Chen", handle: "@techmikechen", contentType: "video", views: "78K", engagement: "6.4%" }
      ],
      features: ["Heart rate monitor", "GPS tracking", "7-day battery"],
      conversionRate: "11.2%",
      inStock: true,
      tags: ["fitness", "smartwatch", "tracking"]
    },
    {
      id: "5",
      name: "Luxury Skincare Set",
      price: 245,
      category: "Beauty",
      rating: 4.8,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
      description: "Complete skincare routine with anti-aging properties",
      influencerContent: [
        { name: "Jessica Kim", handle: "@jessicakimbeauty", contentType: "tutorial", views: "92K", engagement: "7.8%" },
        { name: "Sophie Turner", handle: "@sophieskincare", contentType: "review", views: "67K", engagement: "6.2%" }
      ],
      features: ["Anti-aging formula", "Natural ingredients", "Suitable for all skin types"],
      conversionRate: "13.7%",
      inStock: true,
      tags: ["skincare", "luxury", "anti-aging"]
    },
    {
      id: "6",
      name: "Professional Camera",
      price: 1299,
      category: "Technology",
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
      description: "Professional DSLR camera for photography enthusiasts",
      influencerContent: [
        { name: "David Wilson", handle: "@davidtravels", contentType: "photo", views: "234K", engagement: "9.3%" },
        { name: "Lisa Park", handle: "@lisaparkart", contentType: "tutorial", views: "89K", engagement: "7.1%" }
      ],
      features: ["24MP sensor", "4K video", "Weather sealed"],
      conversionRate: "6.8%",
      inStock: true,
      tags: ["camera", "photography", "professional"]
    },
    {
      id: "7",
      name: "Gaming Laptop",
      price: 1899,
      category: "Technology",
      rating: 4.7,
      reviews: 423,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop",
      description: "High-performance gaming laptop with RTX graphics",
      influencerContent: [
        { name: "Ryan Thompson", handle: "@ryangaming", contentType: "stream", views: "445K", engagement: "12.4%" },
        { name: "Mike Chen", handle: "@techmikechen", contentType: "review", views: "156K", engagement: "8.7%" }
      ],
      features: ["RTX 4070", "16GB RAM", "1TB SSD"],
      conversionRate: "9.2%",
      inStock: true,
      tags: ["gaming", "laptop", "performance"]
    },
    {
      id: "8",
      name: "Yoga Mat Premium",
      price: 89,
      category: "Health & Fitness",
      rating: 4.6,
      reviews: 678,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
      description: "Premium yoga mat with alignment lines and cushioning",
      influencerContent: [
        { name: "Emma Davis", handle: "@emmadavislife", contentType: "workout", views: "123K", engagement: "8.9%" },
        { name: "Alex Rodriguez", handle: "@alexfitness", contentType: "review", views: "67K", engagement: "6.1%" }
      ],
      features: ["Non-slip surface", "Alignment lines", "Eco-friendly"],
      conversionRate: "16.8%",
      inStock: true,
      tags: ["yoga", "fitness", "premium"]
    },
    {
      id: "9",
      name: "Designer Handbag",
      price: 599,
      category: "Fashion",
      rating: 4.8,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
      description: "Luxury designer handbag with premium leather",
      influencerContent: [
        { name: "Sarah Johnson", handle: "@sarahjstyle", contentType: "outfit", views: "234K", engagement: "11.2%" },
        { name: "Emma Davis", handle: "@emmadavislife", contentType: "review", views: "89K", engagement: "7.4%" }
      ],
      features: ["Premium leather", "Multiple compartments", "Adjustable strap"],
      conversionRate: "14.3%",
      inStock: true,
      tags: ["handbag", "luxury", "designer"]
    },
    {
      id: "10",
      name: "Smart Home Hub",
      price: 199,
      category: "Technology",
      rating: 4.5,
      reviews: 345,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      description: "Central hub for smart home automation",
      influencerContent: [
        { name: "Mike Chen", handle: "@techmikechen", contentType: "setup", views: "156K", engagement: "9.1%" },
        { name: "Chris Anderson", handle: "@chrisbusiness", contentType: "review", views: "78K", engagement: "6.8%" }
      ],
      features: ["Voice control", "100+ device support", "Security features"],
      conversionRate: "10.7%",
      inStock: true,
      tags: ["smart home", "automation", "hub"]
    },
    {
      id: "11",
      name: "Organic Coffee Beans",
      price: 45,
      category: "Food & Beverage",
      rating: 4.7,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop",
      description: "Premium organic coffee beans from sustainable farms",
      influencerContent: [
        { name: "Maria Garcia", handle: "@mariacooking", contentType: "brewing", views: "134K", engagement: "8.3%" },
        { name: "Emma Davis", handle: "@emmadavislife", contentType: "review", views: "67K", engagement: "6.9%" }
      ],
      features: ["Single origin", "Medium roast", "Fair trade certified"],
      conversionRate: "18.2%",
      inStock: true,
      tags: ["coffee", "organic", "premium"]
    },
    {
      id: "12",
      name: "Wireless Earbuds",
      price: 159,
      category: "Technology",
      rating: 4.6,
      reviews: 567,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
      description: "True wireless earbuds with active noise cancellation",
      influencerContent: [
        { name: "Mike Chen", handle: "@techmikechen", contentType: "review", views: "198K", engagement: "9.7%" },
        { name: "Alex Rodriguez", handle: "@alexfitness", contentType: "workout", views: "89K", engagement: "7.2%" }
      ],
      features: ["Active noise cancellation", "24-hour battery", "Water resistant"],
      conversionRate: "12.8%",
      inStock: true,
      tags: ["earbuds", "wireless", "audio"]
    },
    {
      id: "13",
      name: "Luxury Perfume",
      price: 189,
      category: "Beauty",
      rating: 4.8,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
      description: "Exclusive fragrance with long-lasting scent",
      influencerContent: [
        { name: "Jessica Kim", handle: "@jessicakimbeauty", contentType: "review", views: "145K", engagement: "10.1%" },
        { name: "Sarah Johnson", handle: "@sarahjstyle", contentType: "outfit", views: "78K", engagement: "7.6%" }
      ],
      features: ["Long-lasting", "Unique blend", "Luxury packaging"],
      conversionRate: "15.9%",
      inStock: true,
      tags: ["perfume", "luxury", "fragrance"]
    },
    {
      id: "14",
      name: "Fitness Equipment Set",
      price: 299,
      category: "Health & Fitness",
      rating: 4.7,
      reviews: 345,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      description: "Complete home gym equipment set",
      influencerContent: [
        { name: "Alex Rodriguez", handle: "@alexfitness", contentType: "workout", views: "267K", engagement: "11.8%" },
        { name: "Emma Davis", handle: "@emmadavislife", contentType: "review", views: "98K", engagement: "8.4%" }
      ],
      features: ["Dumbbells", "Resistance bands", "Exercise mat"],
      conversionRate: "13.4%",
      inStock: true,
      tags: ["fitness", "equipment", "home gym"]
    },
    {
      id: "15",
      name: "Smartphone Pro",
      price: 999,
      category: "Technology",
      rating: 4.9,
      reviews: 1234,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      description: "Latest smartphone with advanced camera system",
      influencerContent: [
        { name: "Mike Chen", handle: "@techmikechen", contentType: "review", views: "456K", engagement: "13.2%" },
        { name: "David Wilson", handle: "@davidtravels", contentType: "photo", views: "234K", engagement: "9.8%" }
      ],
      features: ["Pro camera system", "5G capability", "All-day battery"],
      conversionRate: "8.9%",
      inStock: true,
      tags: ["smartphone", "camera", "5G"]
    },
    {
      id: "16",
      name: "Luxury Watch",
      price: 2499,
      category: "Fashion",
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
      description: "Premium luxury watch with automatic movement",
      influencerContent: [
        { name: "Sarah Johnson", handle: "@sarahjstyle", contentType: "outfit", views: "189K", engagement: "12.7%" },
        { name: "Chris Anderson", handle: "@chrisbusiness", contentType: "review", views: "67K", engagement: "8.1%" }
      ],
      features: ["Automatic movement", "Sapphire crystal", "Water resistant"],
      conversionRate: "7.3%",
      inStock: true,
      tags: ["watch", "luxury", "automatic"]
    },
    {
      id: "17",
      name: "Gaming Console",
      price: 499,
      category: "Technology",
      rating: 4.8,
      reviews: 567,
      image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=400&h=400&fit=crop",
      description: "Next-generation gaming console with 4K graphics",
      influencerContent: [
        { name: "Ryan Thompson", handle: "@ryangaming", contentType: "stream", views: "678K", engagement: "15.4%" },
        { name: "Mike Chen", handle: "@techmikechen", contentType: "review", views: "234K", engagement: "10.2%" }
      ],
      features: ["4K graphics", "1TB storage", "Backward compatibility"],
      conversionRate: "11.6%",
      inStock: true,
      tags: ["gaming", "console", "4K"]
    },
    {
      id: "18",
      name: "Art Supplies Set",
      price: 129,
      category: "Art & Creativity",
      rating: 4.6,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop",
      description: "Professional art supplies for creative projects",
      influencerContent: [
        { name: "Lisa Park", handle: "@lisaparkart", contentType: "tutorial", views: "156K", engagement: "9.3%" },
        { name: "Emma Davis", handle: "@emmadavislife", contentType: "review", views: "78K", engagement: "7.1%" }
      ],
      features: ["Professional quality", "Complete set", "Travel case"],
      conversionRate: "14.7%",
      inStock: true,
      tags: ["art", "supplies", "professional"]
    },
    {
      id: "19",
      name: "Luxury Sunglasses",
      price: 349,
      category: "Fashion",
      rating: 4.7,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
      description: "Designer sunglasses with UV protection",
      influencerContent: [
        { name: "Sarah Johnson", handle: "@sarahjstyle", contentType: "outfit", views: "234K", engagement: "11.9%" },
        { name: "David Wilson", handle: "@davidtravels", contentType: "travel", views: "89K", engagement: "8.2%" }
      ],
      features: ["UV protection", "Polarized lenses", "Designer frame"],
      conversionRate: "16.2%",
      inStock: true,
      tags: ["sunglasses", "luxury", "designer"]
    },
    {
      id: "20",
      name: "Smart Speaker",
      price: 199,
      category: "Technology",
      rating: 4.5,
      reviews: 456,
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop",
      description: "Smart speaker with voice assistant and premium sound",
      influencerContent: [
        { name: "Mike Chen", handle: "@techmikechen", contentType: "review", views: "178K", engagement: "8.9%" },
        { name: "Chris Anderson", handle: "@chrisbusiness", contentType: "setup", views: "67K", engagement: "6.7%" }
      ],
      features: ["Voice assistant", "Premium sound", "Smart home control"],
      conversionRate: "12.1%",
      inStock: true,
      tags: ["speaker", "smart", "voice assistant"]
    }
  ];

  const featuredProduct = enhancedProducts[0];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-4">Product Showcase</h1>
              <p className="text-xl text-muted-foreground">Discover products with authentic influencer content and real reviews</p>
            </div>
            <CartSheet />
          </div>

          <Tabs defaultValue="featured" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="featured">Featured Product</TabsTrigger>
              <TabsTrigger value="catalog">Product Catalog</TabsTrigger>
              <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="featured" className="space-y-6">
              <Card className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                  {/* Product Image & Media */}
                  <div className="space-y-4">
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={featuredProduct.image} 
                        alt={featuredProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Influencer Content Tabs */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Influencer Content</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {featuredProduct.influencerContent.map((content, index) => (
                          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-3 mb-3">
                                <Avatar className="w-8 h-8 bg-gradient-primary">
                                  <AvatarFallback className="text-white text-xs">
                                    {content.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">{content.name}</p>
                                  <p className="text-xs text-muted-foreground">{content.handle}</p>
                                </div>
                              </div>
                              
                              <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-3 relative">
                                <Play className="w-8 h-8 text-muted-foreground" />
                                <Badge className="absolute top-2 right-2 text-xs">
                                  {content.contentType}
                                </Badge>
                              </div>
                              
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{content.views} views</span>
                                <span>{content.engagement} engagement</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary">{featuredProduct.category}</Badge>
                        <Badge variant="outline">Featured</Badge>
                      </div>
                      <h2 className="text-3xl font-bold mb-2">{featuredProduct.name}</h2>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(featuredProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">
                            {featuredProduct.rating} ({featuredProduct.reviews} reviews)
                          </span>
                        </div>
                      </div>
                      <p className="text-3xl font-bold text-primary mb-4">${featuredProduct.price}</p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Key Features</h3>
                      <ul className="space-y-2">
                        {featuredProduct.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Conversion Rate</span>
                        <span className="text-lg font-bold text-green-600">{featuredProduct.conversionRate}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        This product converts {featuredProduct.conversionRate} of viewers to customers
                      </p>
                    </div>

                    <div className="flex space-x-4">
                      <Button 
                        className="flex-1 btn-hero"
                        onClick={() => handleAddToCart(featuredProduct.id)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Trusted by Influencers</h3>
                      <div className="flex -space-x-2">
                        {featuredProduct.influencerContent.map((content, index) => (
                          <Avatar key={index} className="w-10 h-10 bg-gradient-primary border-2 border-background">
                            <AvatarFallback className="text-white font-semibold text-sm">
                              {content.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        <div className="w-10 h-10 bg-muted border-2 border-background rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold">+5</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Featured by 7 verified influencers this month
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="catalog" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">All Products</h2>
                <Button className="btn-hero">Add New Product</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {enhancedProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <div className="aspect-square bg-muted rounded-t-lg overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{product.category}</Badge>
                        <span className="text-lg font-bold text-primary">${product.price}</span>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                      
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>Influencer Content</span>
                          <span className="font-semibold">{product.influencerContent.length} creators</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Conversion Rate</span>
                          <span className="font-semibold text-green-600">{product.conversionRate}</span>
                        </div>
                      </div>

                      <div className="flex -space-x-1 mb-4">
                        {product.influencerContent.map((content, index) => (
                          <Avatar key={index} className="w-6 h-6 bg-gradient-primary border border-background">
                            <AvatarFallback className="text-white text-xs">
                              {content.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 btn-hero"
                          onClick={() => handleAddToCart(product.id)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <h2 className="text-2xl font-bold">Product Performance Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{enhancedProducts.length}</div>
                    <p className="text-xs text-muted-foreground">+12 this month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Conversion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">11.8%</div>
                    <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$247K</div>
                    <p className="text-xs text-muted-foreground">+18% this month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Cart Abandonment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24%</div>
                    <p className="text-xs text-muted-foreground">-8% improvement</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Products</CardTitle>
                    <CardDescription>Products with highest conversion rates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {enhancedProducts
                      .sort((a, b) => parseFloat(b.conversionRate) - parseFloat(a.conversionRate))
                      .slice(0, 5)
                      .map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-muted-foreground">${product.price}</span>
                          <Badge variant="default">{product.conversionRate}</Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Category Performance</CardTitle>
                    <CardDescription>Revenue by product category</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Technology</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-4/5 h-full bg-primary"></div>
                        </div>
                        <span className="text-sm font-semibold">$89K</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Fashion</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-3/5 h-full bg-accent"></div>
                        </div>
                        <span className="text-sm font-semibold">$67K</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Health & Fitness</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-2/3 h-full bg-secondary"></div>
                        </div>
                        <span className="text-sm font-semibold">$91K</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Products;