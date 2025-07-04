import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppStore, Influencer } from "@/lib/store";
import { toast } from "@/hooks/use-toast";

interface ConnectInfluencerDialogProps {
  influencer: Influencer;
  trigger?: React.ReactNode;
}

export const ConnectInfluencerDialog = ({ influencer, trigger }: ConnectInfluencerDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    campaignType: '',
    budget: '',
    message: '',
    deliverables: '',
    timeline: ''
  });

  const updateInfluencer = useAppStore(state => state.updateInfluencer);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.campaignType || !formData.budget || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Update influencer status to pending
    updateInfluencer(influencer.id, { status: 'pending' });
    
    toast({
      title: "Connection Request Sent",
      description: `Your collaboration request has been sent to ${influencer.name}. They will review and respond soon.`
    });

    setFormData({
      campaignType: '',
      budget: '',
      message: '',
      deliverables: '',
      timeline: ''
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button className="btn-hero">Connect</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect with {influencer.name}</DialogTitle>
          <DialogDescription>
            Send a collaboration request to {influencer.handle}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="campaignType">Campaign Type *</Label>
            <Select value={formData.campaignType} onValueChange={(value) => 
              setFormData(prev => ({ ...prev, campaignType: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Select campaign type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product-review">Product Review</SelectItem>
                <SelectItem value="sponsored-post">Sponsored Post</SelectItem>
                <SelectItem value="brand-collaboration">Brand Collaboration</SelectItem>
                <SelectItem value="event-coverage">Event Coverage</SelectItem>
                <SelectItem value="long-term-partnership">Long-term Partnership</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget Range *</Label>
            <Input
              id="budget"
              value={formData.budget}
              onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
              placeholder="e.g., $500-$1000"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliverables">Deliverables</Label>
            <Input
              id="deliverables"
              value={formData.deliverables}
              onChange={(e) => setFormData(prev => ({ ...prev, deliverables: e.target.value }))}
              placeholder="e.g., 3 posts, 5 stories, 1 reel"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeline">Timeline</Label>
            <Input
              id="timeline"
              value={formData.timeline}
              onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
              placeholder="e.g., 2 weeks, 1 month"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Tell them about your brand and collaboration idea..."
              rows={4}
              required
            />
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Influencer Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Followers:</span>
                <span className="ml-2 font-medium">{influencer.followers}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Engagement:</span>
                <span className="ml-2 font-medium">{influencer.engagement}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Niche:</span>
                <span className="ml-2 font-medium">{influencer.niche}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Price Range:</span>
                <span className="ml-2 font-medium">{influencer.priceRange}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="btn-hero">
              Send Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};