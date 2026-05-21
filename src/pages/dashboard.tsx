import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserSubscription } from '@/lib/stripe';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, Users, Shield, Crown } from 'lucide-react';

interface SubscriptionData {
  subscription_status: string | null;
  subscription_id: string | null;
  price_id: string | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean | null;
}

export function DashboardPage() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async () => {
    try {
      setLoading(true);
      const data = await getUserSubscription();
      setSubscription(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load subscription data');
    } finally {
      setLoading(false);
    }
  };

  const isSubscribed = subscription?.subscription_status === 'active';

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage your legal documents and compliance
          </p>
        </div>

        {error && (
          <div className="mb-6">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Subscription Status */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Crown className="h-5 w-5 mr-2" />
                Subscription Status
              </CardTitle>
              <CardDescription>
                Your current plan and billing information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium">
                    {isSubscribed ? 'JurisOS Starter' : 'Free Plan'}
                  </p>
                  {subscription?.subscription_status && (
                    <p className="text-sm text-gray-600 capitalize">
                      Status: {subscription.subscription_status.replace('_', ' ')}
                    </p>
                  )}
                  {subscription?.current_period_end && (
                    <p className="text-sm text-gray-600">
                      Next billing: {formatDate(subscription.current_period_end)}
                    </p>
                  )}
                  {subscription?.cancel_at_period_end && (
                    <p className="text-sm text-orange-600">
                      Subscription will cancel at period end
                    </p>
                  )}
                </div>
                {!isSubscribed && (
                  <Link to="/pricing">
                    <Button>Upgrade Plan</Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Documents
              </CardTitle>
              <CardDescription>
                Upload and review legal documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" disabled={!isSubscribed}>
                {isSubscribed ? 'Upload Document' : 'Upgrade to Upload'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Playbooks
              </CardTitle>
              <CardDescription>
                Create and manage review playbooks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled={!isSubscribed}>
                {isSubscribed ? 'Manage Playbooks' : 'Upgrade for Playbooks'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Team
              </CardTitle>
              <CardDescription>
                Invite and manage team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled={!isSubscribed}>
                {isSubscribed ? 'Invite Team' : 'Upgrade for Team'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
              <CardDescription>
                Your latest document reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                No reviews yet. {!isSubscribed && 'Upgrade to start reviewing documents.'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage Stats</CardTitle>
              <CardDescription>
                Your current usage and limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Document Reviews</span>
                    <span>0 / {isSubscribed ? '50' : '5'}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Playbooks</span>
                    <span>0 / {isSubscribed ? '3' : '1'}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}