"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useRef } from "react";

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const nombre = useRef<HTMLInputElement>(null);
  const apellido = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-balance text-muted-foreground">Join Acme Inc today</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Nombres</Label>
                <Input ref={nombre} id="name" type="text" placeholder="Ingresa tu nombre" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastname">Apellidos</Label>
                <Input ref={apellido} id="lastname" type="text" placeholder="Ingresa tu apellido" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input ref={email} id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input ref={password} id="password" type="password" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input ref={confirmPassword} id="confirmPassword" type="password" required />
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  // Validar que todos los campos estén llenos
                  if (
                    !nombre?.current?.value ||
                    !apellido?.current?.value ||
                    !email?.current?.value ||
                    !password?.current?.value ||
                    !confirmPassword?.current?.value
                  ) {
                    alert("Please fill in all fields.");
                    return;
                  }

                  // Validar que las contraseñas coincidan
                  if (password.current.value !== confirmPassword.current.value) {
                    alert("Passwords do not match.");
                    return;
                  }

                  // Validar longitud de contraseña (mínimo 6 caracteres)
                  if (password.current.value.length < 6) {
                    alert("Password must be at least 6 characters long.");
                    return;
                  }

                  // Validar formato de email básico
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(email.current.value)) {
                    alert("Please enter a valid email address.");
                    return;
                  }

                  // Hacer la petición de registro
                  axios
                    .post("/api/signin", {
                      email: email.current.value,
                      nombres: nombre.current.value,
                      apellidos: apellido.current.value,
                      fechaNacimiento: "",
                      telefono: "",
                      password: password.current.value,
                    })
                    .then((response) => {
                      if (response.data.success) {
                        alert("Account created successfully! Please log in.");
                        router.push("/auth/login");
                      } else {
                        alert("Registration failed: " + response.data.error);
                      }
                    })
                    .catch((error) => {
                      console.error("Registration error:", error);
                      const errorMessage =
                        error.response?.data?.error ??
                        "An error occurred while creating your account. Please try again.";
                      alert(errorMessage);
                    });
                }}
              >
                Create Account
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground">
        By clicking create account, you agree to our Terms of Service and Privacy Policy.
      </div>
    </div>
  );
}
