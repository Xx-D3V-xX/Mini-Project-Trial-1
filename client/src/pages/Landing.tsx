import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Header isLoggedIn={false} />
      <Hero />
      <Features />
    </div>
  );
}
