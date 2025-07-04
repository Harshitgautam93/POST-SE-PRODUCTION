import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BarChart3, Zap, Target, TrendingUp, Shield } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: "Influencer CRM",
      description: "Comprehensive relationship management system to connect and manage your influencer partnerships efficiently.",
      features: ["Contact Management", "Collaboration Tracking", "Performance Analytics", "Communication Hub"]
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-primary" />,
      title: "Analytics Engine",
      description: "Advanced analytics to track performance across all channels and optimize your campaigns in real-time.",
      features: ["Real-time Insights", "Cross-platform Tracking", "ROI Analysis", "Predictive Analytics"]
    },
    {
      icon: <Zap className="h-12 w-12 text-primary" />,
      title: "Content Management",
      description: "Streamlined content creation and distribution system with embedded influencer collaboration tools.",
      features: ["Content Planning", "Asset Library", "Version Control", "Automated Publishing"]
    },
    {
      icon: <Target className="h-12 w-12 text-primary" />,
      title: "Campaign Optimization",
      description: "AI-powered campaign optimization to improve engagement and reduce cart abandonment rates.",
      features: ["A/B Testing", "Audience Targeting", "Conversion Optimization", "Budget Management"]
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-primary" />,
      title: "Performance Tracking",
      description: "Monitor your campaigns across social media and websites with detailed performance metrics.",
      features: ["Multi-channel Tracking", "Custom Dashboards", "Automated Reports", "Goal Tracking"]
    },
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Brand Safety",
      description: "Ensure your brand maintains its integrity with comprehensive safety and compliance tools.",
      features: ["Content Monitoring", "Compliance Checks", "Risk Assessment", "Quality Control"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Powerful Features for
            <span className="gradient-text"> Modern Brands</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to connect with influencers, manage content, and optimize your campaigns for maximum impact.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="glass p-8 rounded-2xl max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Brand?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of brands already using Post Se Production to enhance their influencer marketing campaigns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-hero">Start Free Trial</button>
              <button className="btn-outline-glow">Schedule Demo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;