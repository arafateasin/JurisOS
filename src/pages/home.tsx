import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, FileText, Users, Zap, CircleCheck as CheckCircle, ArrowRight } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered
            <span className="text-primary block">Legal Intelligence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your legal workflow with intelligent contract review, 
            automated risk assessment, and comprehensive compliance management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8 py-3">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need for legal excellence
            </h2>
            <p className="text-xl text-gray-600">
              Powerful tools designed for modern legal teams
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Smart Contract Review</CardTitle>
                <CardDescription>
                  AI-powered analysis identifies risks, suggests improvements, and ensures compliance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Risk Assessment</CardTitle>
                <CardDescription>
                  Automated risk scoring and detailed insights help you make informed decisions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Team Collaboration</CardTitle>
                <CardDescription>
                  Seamless workflow management with real-time collaboration and approval processes
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Automated Playbooks</CardTitle>
                <CardDescription>
                  Create custom review templates that learn from your preferences and standards
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Compliance Management</CardTitle>
                <CardDescription>
                  Stay compliant with automated tracking and regulatory update notifications
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Enterprise Security</CardTitle>
                <CardDescription>
                  Bank-grade security with SOC 2 compliance and advanced data protection
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to transform your legal workflow?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of legal teams already using JurisOS to streamline their operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Start Your Free Trial
              </Button>
            </Link>
            <Link to="/pricing">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-3 bg-transparent border-white text-white hover:bg-white hover:text-primary"
              >
                View Pricing Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}