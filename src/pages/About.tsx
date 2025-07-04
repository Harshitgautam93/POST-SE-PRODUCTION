import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Rocket, Target } from "lucide-react";

const About = () => {
  const stats = [
    { number: "10K+", label: "Brands Connected", icon: <Users className="h-8 w-8 text-primary" /> },
    { number: "50K+", label: "Influencers", icon: <Rocket className="h-8 w-8 text-primary" /> },
    { number: "99.9%", label: "Uptime", icon: <Award className="h-8 w-8 text-primary" /> },
    { number: "2.5x", label: "Avg ROI Increase", icon: <Target className="h-8 w-8 text-primary" /> }
  ];

  const timeline = [
    {
      period: "July 2023",
      title: "Project Inception",
      description: "Started development with React JS, Node JS, and MongoDB to create the foundation of our platform."
    },
    {
      period: "September 2023",
      title: "Core Features Launch",
      description: "Launched the influencer CRM and content management system with basic analytics capabilities."
    },
    {
      period: "February 2024",
      title: "Advanced Analytics",
      description: "Integrated advanced analytics engine with real-time tracking across multiple social media platforms."
    },
    {
      period: "June 2024",
      title: "AI Optimization",
      description: "Added AI-powered campaign optimization features to improve engagement and reduce cart abandonment."
    },
    {
      period: "October 2024",
      title: "Enterprise Ready",
      description: "Completed full-scale deployment on Vercel with enterprise-grade security and performance features."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About
            <span className="gradient-text"> Post Se Production</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We're revolutionizing how brands connect with influencers through our comprehensive e-commerce platform. 
            Built with cutting-edge technology, we help brands enhance product visibility, boost engagement, 
            and make data-driven marketing decisions.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-glow transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-0">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-slide-up">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Post Se Production bridges the gap between brands and influencers by providing a comprehensive platform 
              that streamlines collaboration, optimizes content creation, and maximizes campaign performance.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our integrated approach combines influencer relationship management, advanced analytics, and 
              AI-powered optimization tools to help brands make smarter marketing decisions and achieve 
              better ROI on their influencer campaigns.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">React JS</Badge>
              <Badge variant="secondary">Node JS</Badge>
              <Badge variant="secondary">MongoDB</Badge>
              <Badge variant="secondary">Strapi</Badge>
              <Badge variant="secondary">Vercel</Badge>
            </div>
          </div>
          <div className="glass p-8 rounded-2xl animate-slide-up">
            <h3 className="text-2xl font-semibold mb-4">What We Deliver</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <span className="text-muted-foreground">Improved engagement rates across all marketing channels</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <span className="text-muted-foreground">Reduced cart abandonment through optimized product listings</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <span className="text-muted-foreground">Real-time insights for data-driven marketing decisions</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <span className="text-muted-foreground">Streamlined influencer collaboration workflows</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Development Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-primary"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} animate-slide-up`} style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="p-6 hover:shadow-elegant transition-all duration-300">
                      <CardContent className="p-0">
                        <Badge className="mb-3">{item.period}</Badge>
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="glass p-8 rounded-2xl max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-muted-foreground mb-6">
              Be part of the future of influencer marketing. Start your journey with Post Se Production today.
            </p>
            <button className="btn-hero">Get Started Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;