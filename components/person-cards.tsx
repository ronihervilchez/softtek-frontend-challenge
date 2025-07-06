"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  User,
  Globe,
  Film,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Users,
  Weight,
  Ruler,
  Edit,
  Save,
  Mail,
  MapPin,
  Calendar,
  Eye,
  Camera,
  FileText,
  Star,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import mockData from "@/mocks/fusionados-mock.json";
import mockHistory from "@/mocks/historial-mock.json";
import { History } from "../interfaces/history.interface";

interface Person {
  id?: number;
  nombre: string;
  altura: number;
  peso: number;
  genero: string;
  especie: string;
  planeta: string;
  peliculas: string[];
  maestros: string[];
  aprendices: string[];
  imagen: string;
}

interface ComponentProps {
  activeSection?: string;
  customPeople?: Person[];
  onPersonAdded?: (person: Person) => void;
}

export default function PersonCards({
  activeSection = "gallery",
  customPeople = [],
}: Readonly<ComponentProps>) {
  const people: Person[] = mockData.fusionados.map((person, index) => ({
    id: index + 1,
    ...person,
  }));

  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [customPersonList] = useState<Person[]>(customPeople);

  const allPeople = [...people, ...customPersonList];

  const openPersonDetail = (person: Person) => {
    setSelectedPerson(person);
  };

  const closePersonDetail = () => {
    setSelectedPerson(null);
  };

  const getDescription = (person: Person) => {
    const maestrosText =
      person.maestros.length > 0 ? `Maestros: ${person.maestros.join(", ")}` : "Sin maestros conocidos";
    const aprendicesText =
      person.aprendices.length > 0
        ? `Aprendices: ${person.aprendices.join(", ")}`
        : "Sin aprendices conocidos";
    return `${maestrosText}. ${aprendicesText}`;
  };

  const getSpeciesColor = (species: string) => {
    switch (species.toLowerCase()) {
      case "human":
        return "bg-blue-500";
      case "droid":
        return "bg-gray-500";
      case "wookiee":
        return "bg-brown-500";
      default:
        return "bg-purple-500";
    }
  };

  // Renderizar la sección activa
  if (activeSection === "profile") {
    return <ProfileSection />;
  }

  if (activeSection === "history") {
    return <HistorySection />;
  }

  // Vista por defecto: Galería
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Galería de Personajes</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Descubre a los personajes más legendarios de Star Wars y conoce sus historias
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allPeople.map((person) => (
          <Card
            key={person.id}
            className="flex group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
            onClick={() => openPersonDetail(person)}
          >
            <div className="relative w-[300px] flex-shrink-0">
              <Image
                src={person.imagen ?? "/placeholder.svg"}
                alt={person.nombre}
                width={300}
                height={256}
                className="w-[300px] h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4">
                <Badge className={`${getSpeciesColor(person.especie)} text-white border-0`}>
                  {person.especie}
                </Badge>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors duration-200">
                  {person.nombre}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {getDescription(person)}
                </CardDescription>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-muted-foreground">
          ¿Tienes un personaje favorito? ¡Descubre más sobre sus aventuras!
        </p>
      </div>

      <Dialog open={!!selectedPerson} onOpenChange={closePersonDetail}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedPerson && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold flex items-center gap-3">
                  {selectedPerson.nombre}
                  <Badge className={`${getSpeciesColor(selectedPerson.especie)} text-white border-0`}>
                    {selectedPerson.especie}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="relative">
                  <Image
                    src={selectedPerson.imagen ?? "/placeholder.svg"}
                    alt={selectedPerson.nombre}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Información Personal
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Ruler className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Altura: {selectedPerson.altura} cm</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Weight className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Peso: {selectedPerson.peso} kg</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Género: {selectedPerson.genero}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Planeta: {selectedPerson.planeta}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Film className="h-5 w-5" />
                      Películas
                    </h3>
                    <div className="space-y-1">
                      {selectedPerson.peliculas.map((pelicula, index) => (
                        <Badge key={`${pelicula}-${index}`} variant="outline" className="mr-2 mb-1">
                          {pelicula}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Maestros
                    </h3>
                    <div className="space-y-1">
                      {selectedPerson.maestros.length > 0 ? (
                        selectedPerson.maestros.map((maestro, index) => (
                          <Badge key={`${maestro}-${index}`} variant="secondary" className="mr-2 mb-1">
                            {maestro}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">Sin maestros conocidos</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Aprendices
                    </h3>
                    <div className="space-y-1">
                      {selectedPerson.aprendices.length > 0 ? (
                        selectedPerson.aprendices.map((aprendiz, index) => (
                          <Badge key={`${aprendiz}-${index}`} variant="secondary" className="mr-2 mb-1">
                            {aprendiz}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">Sin aprendices conocidos</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// COMPONENTE DE PERFIL ACTUALIZADO
function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "Alex",
    lastName: "Rodriguez",
    email: "alex.rodriguez@email.com",
    birthDate: "1990-05-15",
    location: "Ciudad de México, México",
    bio: "Apasionado fanático de Star Wars y coleccionista de memorabilia. Me encanta descubrir nuevas historias del universo expandido.",
    joinDate: "Enero 2024",
    charactersViewed: 127,
    favoriteSpecies: "Human",
    avatar: "/placeholder.svg?height=96&width=96",
  });

  const handleSave = () => {
    setIsEditing(false);
    alert("¡Perfil actualizado exitosamente!");
    console.log("Perfil guardado:", profile);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const stats = [
    { label: "Personajes Vistos", value: profile.charactersViewed, icon: Eye },
    { label: "Especie Favorita", value: profile.favoriteSpecies, icon: Star },
    { label: "Miembro desde", value: profile.joinDate, icon: Calendar },
  ];

  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} alt="Perfil" />
                <AvatarFallback className="text-2xl">
                  {profile.firstName[0]}
                  {profile.lastName[0]}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <CardTitle className="text-xl">{fullName}</CardTitle>
            <CardDescription>Fan de Star Wars</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              {profile.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {profile.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(profile.birthDate).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <Button
              className="w-full"
              variant={isEditing ? "default" : "outline"}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Cambios
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Gestiona tu información y preferencias</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  disabled={!isEditing}
                  placeholder="Tu nombre"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  disabled={!isEditing}
                  placeholder="Tu apellido"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                  placeholder="tu@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={profile.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Ubicación</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                disabled={!isEditing}
                placeholder="Tu ciudad, país"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Biografía</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                disabled={!isEditing}
                rows={4}
                placeholder="Cuéntanos sobre ti..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={`${stat.label}-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// NUEVO COMPONENTE DE HISTORIAL CON PAGINACIÓN
function HistorySection() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Procesar datos del historial y ordenar por fecha descendente
  const historyData: History[] = mockHistory
    .map((item, index) => ({
      id: item.id ?? `query-${index + 1}`,
      fechaCreacion: item.fechaCreacion,
      personas: item.people,
    }))
    .sort((a, b) => new Date(b.fechaCreacion ?? '').getTime() - new Date(a.fechaCreacion ?? '').getTime());

  // Calcular paginación
  const totalPages = Math.ceil(historyData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = historyData.slice(startIndex, endIndex);

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Historial de Consultas</h2>
        <p className="text-muted-foreground">
          Revisa las consultas realizadas anteriormente en la plataforma
        </p>
      </div>

      {/* Lista de consultas */}
      <div className="space-y-4">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Consulta #{item.id}</span>
                  <Badge variant="outline" className="text-xs">
                    {item.personas.length} {item.personas.length === 1 ? "persona" : "personas"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.personas.length > 0
                    ? (() => {
                        const additionalCount = item.personas.length - 2;
                        const namesPreview = item.personas.slice(0, 2).map(p => p.nombre).join(", ");
                        const additionalText = additionalCount > 0 ? ` y ${additionalCount} más` : "";
                        return `Incluye: ${namesPreview}${additionalText}`;
                      })()
                    : "Sin personajes"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">
                {formatDate(item.fechaCreacion ?? '')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center justify-between mt-6">
        <Button variant="outline" size="sm" onClick={goToPrevious} disabled={currentPage === 1}>
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>

        <div className="text-sm text-muted-foreground">
          Página {currentPage} de {totalPages}
        </div>

        <Button variant="outline" size="sm" onClick={goToNext} disabled={currentPage === totalPages}>
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
