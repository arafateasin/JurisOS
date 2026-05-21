import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleCheck as CheckCircle } from 'lucide-react';

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // You could validate the session here if needed
    if (sessionId) {
      console.log('Successful checkout session:', sessionId);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription>
              Thank you for subscribing to JurisOS. Your payment has been processed successfully.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center">
            <p className="text-gray-600">
              You now have access to all JurisOS Starter features. Start reviewing contracts with AI-powered insights.
            </p>
            {sessionId && (
              <p className="text-sm text-gray-500 mt-2">
                Session ID: {sessionId}
              </p>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-3">
            <Link to="/dashboard" className="w-full">
              <Button className="w-full">
                Go to Dashboard
              </Button>
            </Link>
            <Link to="/" className="w-full">
              <Button variant="outline" className="w-full">
                Return Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}