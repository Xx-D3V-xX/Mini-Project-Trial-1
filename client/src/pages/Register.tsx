import { Header } from "@/components/Header";
import { AuthForm } from "@/components/AuthForm";
import { useLocation } from "wouter";

export default function Register() {
  const [, setLocation] = useLocation();

  const handleSubmit = (data: { username: string; password: string }) => {
    console.log("Register submitted:", data);
    setLocation("/explore");
  };

  return (
    <div className="min-h-screen">
      <Header isLoggedIn={false} />
      <AuthForm mode="register" onSubmit={handleSubmit} />
    </div>
  );
}
