
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

  const handleLogin = async (username: string, password: string) => {
    try {
      await login(username, password);
      navigate("/predict");
    } catch (error: any) {
      setSubmitError(error.message);
      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">Login to FruitVision</h1>
        
        <AuthForm 
          type="login"
          onSubmit={handleLogin}
          isLoading={isLoading}
        />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
