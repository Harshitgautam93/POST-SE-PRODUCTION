import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { auth } from '@/lib/auth';

interface PaymentFormProps {
  amount: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const PaymentForm = ({ amount, onSuccess, onCancel }: PaymentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create payment intent
      const response = await fetch('http://localhost:3001/api/payments/create-payment-intent', {
        method: 'POST',
        headers: auth.getAuthHeaders(),
        body: JSON.stringify({ amount })
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      const { clientSecret } = await response.json();

      // Create order
      const orderResponse = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: auth.getAuthHeaders(),
        body: JSON.stringify({
          items: [], // This would come from cart
          totalAmount: amount,
          shippingAddress: {
            name: formData.name,
            address: formData.address,
            city: formData.city,
            zipCode: formData.zipCode
          },
          paymentIntentId: 'pi_demo_' + Date.now() // In real app, this would come from Stripe
        })
      });

      if (!orderResponse.ok) {
        throw new Error('Order creation failed');
      }

      toast({
        title: 'Payment Successful',
        description: 'Your order has been placed successfully!'
      });

      onSuccess?.();
    } catch (error) {
      toast({
        title: 'Payment Failed',
        description: error instanceof Error ? error.message : 'Please try again'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
        <CardDescription>
          Complete your purchase for ${amount.toFixed(2)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Cardholder Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Shipping Address</Label>
            <Textarea
              id="address"
              placeholder="Enter your shipping address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="New York"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                placeholder="10001"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}; 