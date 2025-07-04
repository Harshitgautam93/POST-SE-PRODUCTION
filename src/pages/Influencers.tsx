import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Users, TrendingUp } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { ConnectInfluencerDialog } from "@/components/forms/ConnectInfluencerDialog";
import { useState } from "react";

const Influencers = () => {
  const { influencers } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  // Enhanced influencers data with profile pictures
  const enhancedInfluencers = [
    {
      id: "1",
      name: "Sarah Johnson",
      handle: "@sarahjstyle",
      niche: "Fashion & Lifestyle",
      followers: "1.25M",
      engagement: "4.8%",
      rating: 4.9,
      location: "Los Angeles, CA",
      priceRange: "$5K - $15K",
      verified: true,
      status: "active" as const,
      email: "sarah@example.com",
      bio: "Fashion enthusiast sharing style tips and lifestyle content",
      platforms: ["Instagram", "YouTube", "TikTok"],
      recentWork: ["Nike Campaign", "Sephora Partnership", "Fashion Week Coverage"],
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      verifiedBadge: true
    },
    {
      id: "2",
      name: "Mike Chen",
      handle: "@techmikechen",
      niche: "Technology",
      followers: "890K",
      engagement: "6.2%",
      rating: 4.7,
      location: "San Francisco, CA",
      priceRange: "$3K - $12K",
      verified: true,
      status: "active" as const,
      email: "mike@example.com",
      bio: "Tech reviewer and gadget enthusiast",
      platforms: ["YouTube", "Instagram", "Twitter"],
      recentWork: ["Apple Review", "Samsung Partnership", "CES Coverage"],
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      verifiedBadge: true
    },
    {
      id: "3",
      name: "Emma Davis",
      handle: "@emmadavislife",
      niche: "Lifestyle & Wellness",
      followers: "2.1M",
      engagement: "5.1%",
      rating: 4.8,
      location: "New York, NY",
      priceRange: "$8K - $20K",
      verified: true,
      status: "active" as const,
      email: "emma@example.com",
      bio: "Wellness coach and lifestyle influencer",
      platforms: ["Instagram", "YouTube", "TikTok"],
      recentWork: ["Peloton Campaign", "Whole Foods Partnership", "Wellness Retreat"],
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      verifiedBadge: true
    },
    {
      id: "4",
      name: "Alex Rodriguez",
      handle: "@alexfitness",
      niche: "Health & Fitness",
      followers: "1.56M",
      engagement: "7.3%",
      rating: 4.9,
      location: "Miami, FL",
      priceRange: "$6K - $18K",
      verified: true,
      status: "active" as const,
      email: "alex@example.com",
      bio: "Fitness trainer and nutrition expert",
      platforms: ["Instagram", "YouTube", "TikTok"],
      recentWork: ["Gymshark Campaign", "Protein Brand Partnership", "Fitness Challenge"],
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      verifiedBadge: true
    },
    {
      id: "5",
      name: "Jessica Kim",
      handle: "@jessicakimbeauty",
      niche: "Beauty & Makeup",
      followers: "980K",
      engagement: "5.8%",
      rating: 4.6,
      location: "Seattle, WA",
      priceRange: "$4K - $12K",
      verified: true,
      status: "active" as const,
      email: "jessica@example.com",
      bio: "Beauty guru and makeup artist",
      platforms: ["Instagram", "YouTube", "TikTok"],
      recentWork: ["Sephora Campaign", "MAC Partnership", "Beauty Tutorial Series"],
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      verifiedBadge: true
    },
    {
      id: "6",
      name: "David Wilson",
      handle: "@davidtravels",
      niche: "Travel & Adventure",
      followers: "750K",
      engagement: "6.7%",
      rating: 4.8,
      location: "Denver, CO",
      priceRange: "$3K - $10K",
      verified: true,
      status: "active" as const,
      email: "david@example.com",
      bio: "Adventure photographer and travel blogger",
      platforms: ["Instagram", "YouTube", "TikTok"],
      recentWork: ["Airbnb Campaign", "GoPro Partnership", "Travel Documentary"],
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      verifiedBadge: true
    },
    {
      id: "7",
      name: "Maria Garcia",
      handle: "@mariacooking",
      niche: "Food & Cooking",
      followers: "1.2M",
      engagement: "5.4%",
      rating: 4.7,
      location: "Austin, TX",
      priceRange: "$5K - $15K",
      verified: true,
      status: "active" as const,
      email: "maria@example.com",
      bio: "Chef and food content creator",
      platforms: ["Instagram", "YouTube", "TikTok"],
      recentWork: ["Blue Apron Campaign", "KitchenAid Partnership", "Recipe Series"],
      profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      verifiedBadge: true
    },
    {
      id: "8",
      name: "Ryan Thompson",
      handle: "@ryangaming",
      niche: "Gaming & Entertainment",
      followers: "1.8M",
      engagement: "8.1%",
      rating: 4.9,
      location: "Las Vegas, NV",
      priceRange: "$7K - $20K",
      verified: true,
      status: "active" as const,
      email: "ryan@example.com",
      bio: "Professional gamer and streamer",
      platforms: ["Twitch", "YouTube", "Instagram"],
      recentWork: ["Razer Campaign", "EA Partnership", "Gaming Tournament"],
      profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      verifiedBadge: true
    },
    {
      id: "9",
      name: "Lisa Park",
      handle: "@lisaparkart",
      niche: "Art & Creativity",
      followers: "650K",
      engagement: "4.9%",
      rating: 4.8,
      location: "Portland, OR",
      priceRange: "$2K - $8K",
      verified: true,
      status: "active" as const,
      email: "lisa@example.com",
      bio: "Digital artist and creative content creator",
      platforms: ["Instagram", "YouTube", "TikTok"],
      recentWork: ["Adobe Campaign", "Wacom Partnership", "Art Tutorial Series"],
      profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      verifiedBadge: true
    },
    {
      id: "10",
      name: "Chris Anderson",
      handle: "@chrisbusiness",
      niche: "Business & Finance",
      followers: "950K",
      engagement: "5.2%",
      rating: 4.7,
      location: "Chicago, IL",
      priceRange: "$6K - $16K",
      verified: true,
      status: "active" as const,
      email: "chris@example.com",
      bio: "Business consultant and financial advisor",
      platforms: ["LinkedIn", "YouTube", "Instagram"],
      recentWork: ["Robinhood Campaign", "Masterclass Partnership", "Business Tips Series"],
      profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
      verifiedBadge: true
    },
    {
      id: "11",
      name: "Sophie Turner",
      handle: "@sophieskincare",
      niche: "Skincare & Beauty",
      followers: "1.1M",
      engagement: "6.1%",
      rating: 4.8,
      location: "Boston, MA",
      priceRange: "$5K - $14K",
      verified: true,
      status: "active" as const,
      email: "sophie@example.com",
      bio: "Skincare specialist and dermatology enthusiast",
      platforms: ["Instagram", "YouTube", "TikTok"],
      recentWork: ["CeraVe Campaign", "The Ordinary Partnership", "Skincare Routine Series"],
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      verifiedBadge: true
    },
    {
      id: "12",
      name: "Marcus Johnson",
      handle: "@marcusmusic",
      niche: "Music & Entertainment",
      followers: "1.4M",
      engagement: "7.2%",
      rating: 4.9,
      location: "Nashville, TN",
      priceRange: "$8K - $22K",
      verified: true,
      status: "active" as const,
      email: "marcus@example.com",
      bio: "Musician and music producer",
      platforms: ["Instagram", "YouTube", "TikTok"],
      recentWork: ["Spotify Campaign", "Fender Partnership", "Music Production Series"],
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      verifiedBadge: true
    },
    {
      id: "13",
      name: "Amanda Lee",
      handle: "@amandaparenting",
      niche: "Parenting & Family",
      followers: "850K",
      engagement: "5.6%",
      rating: 4.7,
      location: "Phoenix, AZ",
      priceRange: "$4K - $12K",
      verified: true,
      status: "active" as const,
      email: "amanda@example.com",
      bio: "Parenting expert and family lifestyle blogger",
      platforms: ["Instagram", "YouTube", "TikTok"],
      recentWork: ["Gerber Campaign", "Fisher-Price Partnership", "Parenting Tips Series"],
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      verifiedBadge: true
    },
    {
      id: "14",
      name: "Kevin Zhang",
      handle: "@kevinscience",
      niche: "Science & Education",
      followers: "720K",
      engagement: "6.8%",
      rating: 4.8,
      location: "Seattle, WA",
      priceRange: "$3K - $10K",
      verified: true,
      status: "active" as const,
      email: "kevin@example.com",
      bio: "Science educator and researcher",
      platforms: ["YouTube", "Instagram", "TikTok"],
      recentWork: ["NASA Campaign", "National Geographic Partnership", "Science Series"],
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      verifiedBadge: true
    },
    {
      id: "15",
      name: "Rachel Green",
      handle: "@rachelhome",
      niche: "Home & DIY",
      followers: "680K",
      engagement: "5.3%",
      rating: 4.6,
      location: "Atlanta, GA",
      priceRange: "$3K - $9K",
      verified: true,
      status: "active" as const,
      email: "rachel@example.com",
      bio: "Home improvement expert and DIY enthusiast",
      platforms: ["Instagram", "YouTube", "TikTok"],
      recentWork: ["Home Depot Campaign", "IKEA Partnership", "DIY Tutorial Series"],
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      verifiedBadge: true
    }
  ];

  const filteredInfluencers = enhancedInfluencers.filter(influencer => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         influencer.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         influencer.niche.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNiche = selectedNiche === 'all' || influencer.niche === selectedNiche;
    const matchesPlatform = selectedPlatform === 'all' || influencer.platforms.includes(selectedPlatform);
    
    return matchesSearch && matchesNiche && matchesPlatform;
  });

  const niches = ['all', ...Array.from(new Set(enhancedInfluencers.map(i => i.niche)))];
  const platforms = ['all', 'Instagram', 'YouTube', 'TikTok', 'Twitter', 'LinkedIn', 'Twitch', 'Pinterest'];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-4">Influencer Network</h1>
            <p className="text-xl text-muted-foreground">Discover and connect with top influencers across all niches</p>
          </div>

          <Tabs defaultValue="discover" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="discover">Discover</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="verified">Verified</TabsTrigger>
            </TabsList>

            <TabsContent value="discover" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">All Influencers</h2>
                <Button className="btn-hero">Connect New Influencer</Button>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search influencers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select niche" />
                  </SelectTrigger>
                  <SelectContent>
                    {niches.map(niche => (
                      <SelectItem key={niche} value={niche}>
                        {niche === 'all' ? 'All Niches' : niche}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map(platform => (
                      <SelectItem key={platform} value={platform}>
                        {platform === 'all' ? 'All Platforms' : platform}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredInfluencers.map((influencer) => (
                  <Card key={influencer.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="p-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={influencer.profileImage} alt={influencer.name} />
                          <AvatarFallback className="bg-gradient-primary text-white">
                            {influencer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <CardTitle className="text-lg truncate">{influencer.name}</CardTitle>
                            {influencer.verifiedBadge && (
                              <Badge variant="default" className="text-xs">✓</Badge>
                            )}
                          </div>
                          <CardDescription className="truncate">{influencer.handle}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Followers</span>
                          <span className="font-semibold">{influencer.followers}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Engagement</span>
                          <span className="font-semibold">{influencer.engagement}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Rating</span>
                          <div className="flex items-center space-x-1">
                            <span className="font-semibold">{influencer.rating}</span>
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{influencer.location}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Users className="w-3 h-3" />
                          <span>{influencer.niche}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {influencer.platforms.slice(0, 3).map((platform) => (
                          <Badge key={platform} variant="secondary" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                        {influencer.platforms.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{influencer.platforms.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Profile
                        </Button>
                        <ConnectInfluencerDialog 
                          influencer={influencer}
                          trigger={<Button size="sm" className="flex-1 btn-hero">Connect</Button>}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trending" className="space-y-6">
              <h2 className="text-2xl font-bold">Trending Influencers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enhancedInfluencers
                  .sort((a, b) => parseFloat(b.engagement) - parseFloat(a.engagement))
                  .slice(0, 6)
                  .map((influencer) => (
                  <Card key={influencer.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={influencer.profileImage} alt={influencer.name} />
                          <AvatarFallback className="bg-gradient-primary text-white text-lg">
                            {influencer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            {influencer.name}
                            {influencer.verifiedBadge && (
                              <Badge variant="default" className="text-xs">✓</Badge>
                            )}
                          </CardTitle>
                          <CardDescription>{influencer.handle}</CardDescription>
                          <div className="flex items-center space-x-1 mt-1">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-green-500 font-medium">Trending</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Followers</p>
                          <p className="font-semibold">{influencer.followers}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Engagement</p>
                          <p className="font-semibold">{influencer.engagement}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">View Profile</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="verified" className="space-y-6">
              <h2 className="text-2xl font-bold">Verified Influencers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enhancedInfluencers
                  .filter(influencer => influencer.verifiedBadge)
                  .slice(0, 9)
                  .map((influencer) => (
                  <Card key={influencer.id} className="hover:shadow-lg transition-shadow border-primary/20">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={influencer.profileImage} alt={influencer.name} />
                          <AvatarFallback className="bg-gradient-primary text-white text-lg">
                            {influencer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            {influencer.name}
                            <Badge variant="default" className="text-xs">✓ Verified</Badge>
                          </CardTitle>
                          <CardDescription>{influencer.handle}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Followers</p>
                          <p className="font-semibold">{influencer.followers}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Engagement</p>
                          <p className="font-semibold">{influencer.engagement}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">View Profile</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Influencers;