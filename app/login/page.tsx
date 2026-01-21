import { LoginForm } from "@/components/ui/login-form";
import { redirect } from "next/navigation";

export default function Login() {
  return redirect("auth/login");
  return (
    <div>
      <div>
        <LoginForm />
      </div>
    </div>
  );
}
