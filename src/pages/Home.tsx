
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, LogIn, Upload } from "lucide-react";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">Fruit</span>Vision
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-powered fruit recognition and analysis
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isAuthenticated ? (
              <Link to="/predict">
                <Button size="lg" className="flex items-center gap-2">
                  <Upload size={18} />
                  Upload an Image
                  <ArrowRight size={16} className="ml-1" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button size="lg" className="flex items-center gap-2">
                    <LogIn size={18} />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Fruit Recognition</h3>
            <p className="text-gray-600">
              Upload an image and our AI will identify the fruit type and ripeness with high accuracy.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Detailed Analysis</h3>
            <p className="text-gray-600">
              Get comprehensive metrics and visualizations of the prediction results and model performance.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-600">
              Your data is protected with JWT authentication and is only processed for the duration of your session.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="flex-1 p-4 text-center">
              <div className="inline-flex h-10 w-10 rounded-full bg-primary/10 items-center justify-center mb-2">
                <span className="text-primary font-semibold">1</span>
              </div>
              <h3 className="font-semibold mb-1">Create an account</h3>
              <p className="text-sm text-gray-600">
                Register with a username and password to get started
              </p>
            </div>
            
            <div className="hidden md:block w-8 h-0.5 bg-gray-200"></div>
            
            <div className="flex-1 p-4 text-center">
              <div className="inline-flex h-10 w-10 rounded-full bg-primary/10 items-center justify-center mb-2">
                <span className="text-primary font-semibold">2</span>
              </div>
              <h3 className="font-semibold mb-1">Upload your image</h3>
              <p className="text-sm text-gray-600">
                Select or drag & drop a fruit image for analysis
              </p>
            </div>
            
            <div className="hidden md:block w-8 h-0.5 bg-gray-200"></div>
            
            <div className="flex-1 p-4 text-center">
              <div className="inline-flex h-10 w-10 rounded-full bg-primary/10 items-center justify-center mb-2">
                <span className="text-primary font-semibold">3</span>
              </div>
              <h3 className="font-semibold mb-1">Get results</h3>
              <p className="text-sm text-gray-600">
                View predictions, metrics, and visual analysis
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} FruitVision AI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
