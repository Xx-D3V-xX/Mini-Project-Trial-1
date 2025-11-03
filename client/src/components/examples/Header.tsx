import { Header } from "../Header";

export default function HeaderExample() {
  return (
    <Header
      isLoggedIn={true}
      onLogout={() => console.log("Logout clicked")}
    />
  );
}
