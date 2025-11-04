import { Header } from "@/components/Header";
import { AuthForm } from "@/components/AuthForm";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [, setLocation] = useLocation();
  const { register, user } = useAuth();
  const { toast } = useToast();

  if (user) {
    setLocation("/explore");
  }

  const handleSubmit = async (data: { username: string; password: string }) => {
    try {
      await register(data.username, data.password);
      toast({
        title: "Registration successful",
        description: "Welcome to Mumbai Explorer!",
      });
      setLocation("/explore");
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Username already exists",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <AuthForm mode="register" onSubmit={handleSubmit} />
    </div>
  );
}
