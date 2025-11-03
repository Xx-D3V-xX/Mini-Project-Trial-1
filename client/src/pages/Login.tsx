import { Header } from "@/components/Header";
import { AuthForm } from "@/components/AuthForm";
import { useLocation } from "wouter";

export default function Login() {
  const [, setLocation] = useLocation();

  const handleSubmit = (data: { username: string; password: string }) => {
    console.log("Login submitted:", data);
    setLocation("/explore");
  };

  return (
    <div className="min-h-screen">
      <Header isLoggedIn={false} />
      <AuthForm mode="login" onSubmit={handleSubmit} />
    </div>
  );
}
