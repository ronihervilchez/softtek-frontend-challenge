import { SignupForm } from "../../../components/singup-form";
import { ThemeToggle } from "../../../components/theme-toggle";

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <ThemeToggle />
      <div className="w-full max-w-sm md:max-w-md">
        <SignupForm />
      </div>
    </div>
  );
}
