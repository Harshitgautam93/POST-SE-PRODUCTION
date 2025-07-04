import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useAppStore } from "@/lib/store";
import { CreateCampaignDialog } from "@/components/forms/CreateCampaignDialog";
import { useState, useMemo, useEffect } from "react";
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Target, BarChart3, PieChart as PieChartIcon, Activity } from "lucide-react";
import { auth } from '@/lib/auth';

interface AnalyticsData {
  revenueData: Array<{ date: string; revenue: number }>;
  conversionData: Array<{ date: string; conversions: number }>;
  topProducts: Array<{
    name: string;
    category: string;
    total_revenue: number;
    data_points: number;
  }>;
  campaigns: Array<{
    name: string;
    status: string;
    progress: number;
    reach: number;
    engagement: string;
    budget: number;
    metrics: {
      impressions: number;
      clicks: number;
      conversions: number;
      roi: number;
    };
  }>;
}

const Dashboard = () => {
  const { campaigns, influencers, products } = useAppStore();
  const [selectedTimeRange, setSelectedTimeRange] = useState('6months');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState('7d');

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/analytics/dashboard?period=${period}`, {
        headers: auth.getAuthHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate real-time metrics from store data
  const metrics = useMemo(() => {
    const totalCampaigns = campaigns.length;
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
    const totalReach = campaigns.reduce((sum, c) => sum + c.reach, 0);
    const totalConversions = campaigns.reduce((sum, c) => sum + c.metrics.conversions, 0);
    const avgROI = campaigns.length > 0 
      ? campaigns.reduce((sum, c) => sum + c.metrics.roi, 0) / campaigns.length 
      : 0;

    return {
      totalReach: (totalReach / 1000000).toFixed(1) + 'M',
      activeCampaigns,
      totalConversions,
      avgROI: avgROI.toFixed(1) + 'x',
      totalCampaigns
    };
  }, [campaigns]);

  const campaignData = [
    { name: 'Jan', reach: 45000, engagement: 3400, conversions: 240 },
    { name: 'Feb', reach: 52000, engagement: 4100, conversions: 290 },
    { name: 'Mar', reach: 48000, engagement: 3800, conversions: 280 },
    { name: 'Apr', reach: 61000, engagement: 4900, conversions: 350 },
    { name: 'May', reach: 55000, engagement: 4200, conversions: 320 },
    { name: 'Jun', reach: 67000, engagement: 5300, conversions: 410 },
  ];

  const platformData = [
    { name: 'Instagram', value: 45, color: 'hsl(var(--primary))' },
    { name: 'YouTube', value: 30, color: 'hsl(var(--accent))' },
    { name: 'TikTok', value: 25, color: 'hsl(var(--secondary))' },
  ];

  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const totalRevenue = analyticsData?.revenueData?.reduce((sum, item) => sum + item.revenue, 0) || 0;
  const totalConversions = analyticsData?.conversionData?.reduce((sum, item) => sum + item.conversions, 0) || 0;
  const avgConversionRate = totalConversions > 0 ? (totalConversions / (analyticsData?.revenueData?.length || 1)) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-4">Brand Dashboard & Analytics</h1>
            <p className="text-xl text-muted-foreground">Manage your influencer campaigns and track performance in real-time</p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="influencers">Influencers</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.totalReach}</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.activeCampaigns}</div>
                    <p className="text-xs text-muted-foreground">+3 this week</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.totalConversions}</div>
                    <p className="text-xs text-muted-foreground">+8% conversion rate</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">ROI</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.avgROI}</div>
                    <p className="text-xs text-muted-foreground">+0.3x from last quarter</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Performance</CardTitle>
                    <CardDescription>Monthly reach and engagement trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={campaignData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="reach" stroke="hsl(var(--primary))" strokeWidth={2} />
                        <Line type="monotone" dataKey="engagement" stroke="hsl(var(--accent))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Platform Distribution</CardTitle>
                    <CardDescription>Engagement across social media platforms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={platformData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {platformData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Active Campaigns</h2>
                <CreateCampaignDialog />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {campaign.name}
                        <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                          {campaign.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{campaign.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{campaign.progress}%</span>
                      </div>
                      <Progress value={campaign.progress} />
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Reach</p>
                          <p className="font-semibold">{(campaign.reach / 1000).toFixed(0)}K</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Engagement</p>
                          <p className="font-semibold">{campaign.engagement}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">View Details</Button>
                    </CardContent>
                  </Card>
                ))}
                
                {campaigns.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <p className="text-lg mb-4">No campaigns yet</p>
                    <CreateCampaignDialog />
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="influencers" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Top Influencers</h2>
                <Button className="btn-hero">Connect New Influencer</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {influencers.slice(0, 6).map((influencer) => (
                  <Card key={influencer.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                          {influencer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{influencer.name}</CardTitle>
                          <CardDescription>{influencer.handle}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Followers</span>
                        <span className="font-semibold">{(influencer.followers / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Engagement</span>
                        <span className="font-semibold">{influencer.engagement}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Rating</span>
                        <div className="flex items-center space-x-1">
                          <span className="font-semibold">{influencer.rating}</span>
                          <span className="text-yellow-400">★</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">View Profile</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Advanced Analytics</h2>
                  <p className="text-muted-foreground">Comprehensive insights and performance metrics</p>
                </div>
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1d">Last 24h</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+12.5%</span> from last period
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalConversions.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+8.2%</span> from last period
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Conversion Rate</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{avgConversionRate.toFixed(1)}%</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-red-600">-2.1%</span> from last period
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analyticsData?.campaigns?.filter(c => c.status === 'active').length || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {analyticsData?.campaigns?.length || 0} total campaigns
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trends</CardTitle>
                    <CardDescription>Revenue performance over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={analyticsData?.revenueData || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Conversion Trends</CardTitle>
                    <CardDescription>Conversion performance over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analyticsData?.conversionData || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="conversions" fill="hsl(var(--accent))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Products</CardTitle>
                  <CardDescription>Products with highest revenue generation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData?.topProducts?.slice(0, 5).map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <span className="font-medium">{product.name}</span>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{formatCurrency(product.total_revenue)}</div>
                          <div className="text-sm text-muted-foreground">{product.data_points} data points</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <h2 className="text-2xl font-bold">Campaign Performance</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign ROI Analysis</CardTitle>
                    <CardDescription>Return on investment by campaign</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analyticsData?.campaigns?.slice(0, 5) || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="budget" fill="hsl(var(--muted))" />
                        <Bar dataKey="reach" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Engagement Distribution</CardTitle>
                    <CardDescription>Engagement rates across campaigns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData?.campaigns?.slice(0, 5).map((campaign, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{campaign.name}</span>
                            <span>{campaign.engagement}</span>
                    </div>
                          <Progress value={parseFloat(campaign.engagement)} className="h-2" />
                    </div>
                      ))}
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

export default Dashboard;