import { AuthForm } from "../AuthForm";

export default function AuthFormExample() {
  return (
    <AuthForm
      mode="login"
      onSubmit={(data) => console.log("Auth submit:", data)}
    />
  );
}
