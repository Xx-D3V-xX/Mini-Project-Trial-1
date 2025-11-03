import { Header } from "@/components/Header";
import { AuthForm } from "@/components/AuthForm";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login, user } = useAuth();
  const { toast } = useToast();

  if (user) {
    setLocation("/explore");
  }

  const handleSubmit = async (data: { username: string; password: string }) => {
    try {
      await login(data.username, data.password);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      setLocation("/explore");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <AuthForm mode="login" onSubmit={handleSubmit} />
    </div>
  );
}
