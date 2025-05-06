
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/contexts/AuthContext";

const Register = () => {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

  const handleRegister = async (username: string, password: string) => {
    try {
      await register(username, password);
      navigate("/login");
    } catch (error: any) {
      setSubmitError(error.message);
      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">Create an Account</h1>
        
        <AuthForm 
          type="register"
          onSubmit={handleRegister}
          isLoading={isLoading}
        />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
