import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Users, 
  Zap, 
  TrendingUp, 
  Shield, 
  Star, 
  ArrowRight, 
  Play,
  CheckCircle,
  Target,
  Activity,
  Globe
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import dashboardPreview from "@/assets/dashboard-preview.jpg";

const Index = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Influencer CRM",
      description: "Manage relationships with influencers through our comprehensive CRM system with advanced tracking and analytics."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Analytics Engine",
      description: "Real-time insights and performance tracking across all social media platforms and websites."
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Content Management",
      description: "Streamlined content creation and distribution with embedded influencer collaboration tools."
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "Improve Engagement",
      description: "Boost brand engagement rates by 150% with optimized influencer content and strategic partnerships."
    },
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      title: "Reduce Cart Abandonment",
      description: "Decrease cart abandonment by 35% through targeted influencer product recommendations and content."
    },
    {
      icon: <Activity className="h-6 w-6 text-primary" />,
      title: "Real-time Insights",
      description: "Make data-driven decisions with comprehensive analytics and performance tracking across all channels."
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Multi-Platform Tracking",
      description: "Track campaign performance across social media, websites, and e-commerce platforms in one dashboard."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director at Fashion Co",
      content: "Post Se Production transformed our influencer marketing strategy. We've seen a 200% increase in engagement and 40% boost in sales.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Brand Manager at Tech Startup",
      content: "The analytics and CRM features are game-changing. We can now track ROI on every influencer partnership with precision.",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      role: "E-commerce Manager",
      content: "Our cart abandonment rate dropped significantly after implementing their optimized product listings with influencer content.",
      rating: 5
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Connect Your Brand",
      description: "Set up your brand profile and connect your social media accounts and e-commerce platform."
    },
    {
      step: "02", 
      title: "Find Influencers",
      description: "Discover and connect with relevant influencers using our advanced matching algorithm."
    },
    {
      step: "03",
      title: "Create Campaigns",
      description: "Launch optimized campaigns with embedded content and real-time performance tracking."
    },
    {
      step: "04",
      title: "Analyze & Optimize",
      description: "Use our analytics engine to refine your strategy and maximize ROI on future campaigns."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
                The Future of Influencer Marketing
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Connect Brands with
                <span className="gradient-text"> Influencers</span>
                <br />
                Like Never Before
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Post Se Production is the comprehensive e-commerce platform that bridges brands and influencers, 
                featuring integrated CRM, content management, and analytics to maximize your marketing impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button className="btn-hero group">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" className="btn-outline-glow group">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>14-Day Free Trial</span>
                </div>
              </div>
            </div>
            <div className="animate-slide-up">
              <div className="relative">
                <div className="absolute -inset-1 gradient-primary rounded-2xl opacity-20 blur animate-float"></div>
                <img 
                  src={heroImage} 
                  alt="Post Se Production Dashboard" 
                  className="relative rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Powerful Features for
              <span className="gradient-text"> Modern Brands</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to manage influencer relationships, create compelling content, 
              and track performance across all your marketing channels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-glow transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <img 
                src={dashboardPreview} 
                alt="Dashboard Analytics" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">
                Drive Results That
                <span className="gradient-text"> Matter</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                Transform your marketing strategy with data-driven insights and proven optimization techniques 
                that deliver measurable results for your brand.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              How Post Se Production
              <span className="gradient-text"> Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get started in minutes with our streamlined process designed to maximize your influencer marketing ROI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center relative overflow-hidden animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="absolute top-0 left-0 w-full h-1 gradient-primary"></div>
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">{step.step}</span>
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              What Our Clients
              <span className="gradient-text"> Say</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it. See what industry leaders are saying about Post Se Production.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative overflow-hidden animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your
              <span className="gradient-text"> Marketing?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join thousands of brands already using Post Se Production to enhance their influencer marketing campaigns 
              and drive measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero group">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="btn-outline-glow">
                Schedule Demo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text mb-4">Post Se Production</div>
            <p className="text-muted-foreground mb-6">
              Connecting brands with influencers through innovative technology and data-driven insights.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <span>Built with React JS, Node JS, MongoDB & Strapi</span>
              <span>•</span>
              <span>Deployed on Vercel</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;