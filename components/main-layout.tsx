"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn, getSessionStorage, removeSessionStorage } from "@/lib/utils";
import { Clock, GalleryThumbnailsIcon as Gallery, Home, LogOut, Menu, Moon, Sun, User, X } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "../app/redux/store";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Readonly<MainLayoutProps>) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getSessionStorage("auth");
    router.push(auth ? "/personajes" : "/auth/login");
    if (auth) setLoading(false);
  }, [router]);

  // Determinar la sección activa basada en la ruta
  const getActiveSection = () => {
    if (pathname.includes("/personajes")) return "gallery";
    if (pathname.includes("/perfil")) return "profile";
    if (pathname.includes("/historial")) return "history";
    return "gallery";
  };

  const activeSection = getActiveSection();

  const navigationItems = [
    {
      id: "gallery",
      label: "Galería de Personajes",
      icon: Gallery,
      path: "/personajes",
    },
    {
      id: "history",
      label: "Historial",
      icon: Clock,
      path: "/historial",
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    // Limpiar datos de autenticación
    removeSessionStorage("auth");
    // Redirigir al login
    router.push("/auth/login");
  };

  return (
    <Provider store={store}>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
          <div className="text-lg text-muted-foreground">Cargando...</div>
        </div>
      ) : (
        <div className="flex h-screen bg-background">
          {/* Sidebar */}
          <div
            className={cn(
              "bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out",
              sidebarOpen ? "w-64" : "w-0 overflow-hidden"
            )}
          >
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Home className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Star Wars Gallery</h2>
                    <p className="text-sm text-muted-foreground">Tu colección personal</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <nav className="flex-1 p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={activeSection === item.id ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 h-12",
                        activeSection === item.id && "bg-primary text-primary-foreground"
                      )}
                      onClick={() => handleNavigation(item.path)}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="bg-card border-b border-border p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {!sidebarOpen && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSidebarOpen(true)}
                      className="h-10 w-10"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  )}

                  <div>
                    <h1 className="text-2xl font-bold">
                      {activeSection === "profile" && "Mi Perfil"}
                      {activeSection === "gallery" && "Galería de Personajes"}
                      {activeSection === "history" && "Historial"}
                    </h1>
                    <p className="text-muted-foreground">
                      {activeSection === "profile" && "Gestiona tu información personal"}
                      {activeSection === "gallery" && "Explora tu colección de personajes"}
                      {activeSection === "history" && "Revisa tu actividad reciente"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="h-10 w-10"
                  >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>

                  <div className="text-right">
                    <p className="font-medium">Alex Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Fan de Star Wars</p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="h-12 w-12 cursor-pointer">
                        <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Perfil" />
                        <AvatarFallback>AR</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => handleNavigation("/perfil")} className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Mi Perfil
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar Sesión
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>

            {/* Content */}
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </div>
      )}
    </Provider>
  );
}
