
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, User, Mail, Lock, Eye, EyeOff } from "lucide-react";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (username: string, password: string, email?: string, confirmPassword?: string) => Promise<void>;
  isLoading: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, isLoading }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (type === "register") {
      if (!username || !email || !password || !confirmPassword) {
        setError("Please fill in all fields");
        return;
      }
      
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address");
        return;
      }
    } else {
      if (!username || !password) {
        setError("Please fill in all fields");
        return;
      }
    }

    try {
      if (type === "register") {
        await onSubmit(username, password, email, confirmPassword);
      } else {
        await onSubmit(username, password);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-zoom-in">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {type === "login" ? "Login" : "Create an account"}
        </CardTitle>
        <CardDescription>
          {type === "login"
            ? "Enter your credentials to access your account"
            : "Enter your details to create a new account"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              disabled={isLoading}
              className="w-full"
            />
          </div>

          {type === "register" && (
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isLoading}
                  className="w-full"
                />
                <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                className="w-full"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {type === "register" && (
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                  className="w-full"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2" />
                {type === "login" ? "Logging in..." : "Registering..."}
              </div>
            ) : (
              <>
                {type === "login" ? (
                  <>
                    <LogIn size={18} />
                    Login
                  </>
                ) : (
                  <>
                    <User size={18} />
                    Register
                  </>
                )}
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AuthForm;
