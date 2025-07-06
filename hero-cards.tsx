"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Zap, Shield, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { Edit, Save, Mail, MapPin, Calendar, Eye, Camera, Clock, FileText, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ComponentProps {
  activeSection?: string
  customHeroes?: any[]
  onHeroAdded?: (hero: any) => void
}

export default function Component({ activeSection = "gallery", customHeroes = [], onHeroAdded }: ComponentProps) {
  const heroes = [
    {
      id: 1,
      name: "Iron Man",
      description:
        "Genio, multimillonario, playboy y filántropo. Tony Stark usa su armadura tecnológicamente avanzada para proteger el mundo como Iron Man.",
      image: "/placeholder.svg?height=300&width=300",
      category: "Tecnología",
      color: "bg-red-500",
      powers: ["Armadura de alta tecnología", "Inteligencia superior", "Vuelo", "Rayos repulsores"],
      origin:
        "Después de ser herido y capturado en una zona de guerra, Tony Stark construyó su primera armadura para escapar y decidió usar su tecnología para proteger el mundo.",
      stats: { strength: 85, intelligence: 100, speed: 70, durability: 85 },
    },
    {
      id: 2,
      name: "Wonder Woman",
      description:
        "Princesa amazona de Themyscira, dotada de poderes divinos y una guerrera incomparable que lucha por la justicia y la paz.",
      image: "/placeholder.svg?height=300&width=300",
      category: "Mitología",
      color: "bg-yellow-500",
      powers: ["Fuerza sobrehumana", "Vuelo", "Lazo de la verdad", "Brazaletes indestructibles"],
      origin:
        "Diana Prince es una princesa amazona de la isla paradisíaca de Themyscira, entrenada para ser una guerrera invencible.",
      stats: { strength: 95, intelligence: 80, speed: 85, durability: 90 },
    },
    {
      id: 3,
      name: "Spider-Man",
      description:
        "Peter Parker obtuvo poderes arácnidos tras ser mordido por una araña radioactiva. Con gran poder viene gran responsabilidad.",
      image: "/placeholder.svg?height=300&width=300",
      category: "Mutante",
      color: "bg-blue-500",
      powers: ["Sentido arácnido", "Fuerza proporcional", "Agilidad", "Lanzatelarañas"],
      origin:
        "Peter Parker era un estudiante de secundaria cuando fue mordido por una araña radioactiva durante una excursión escolar.",
      stats: { strength: 75, intelligence: 90, speed: 95, durability: 70 },
    },
    {
      id: 4,
      name: "Black Panther",
      description:
        "Rey de Wakanda y protector de su pueblo. T'Challa combina tecnología avanzada con tradiciones ancestrales en su lucha por la justicia.",
      image: "/placeholder.svg?height=300&width=300",
      category: "Realeza",
      color: "bg-purple-500",
      powers: ["Fuerza mejorada", "Agilidad felina", "Traje de vibranium", "Garras retráctiles"],
      origin:
        "T'Challa es el rey de Wakanda, una nación africana tecnológicamente avanzada, y heredó el manto de Black Panther.",
      stats: { strength: 80, intelligence: 85, speed: 90, durability: 85 },
    },
    {
      id: 5,
      name: "Captain Marvel",
      description:
        "Carol Danvers posee poderes cósmicos increíbles. Como una de las heroínas más poderosas, protege tanto la Tierra como el cosmos.",
      image: "/placeholder.svg?height=300&width=300",
      category: "Cósmico",
      color: "bg-green-500",
      powers: ["Vuelo espacial", "Energía fotónica", "Fuerza cósmica", "Resistencia sobrehumana"],
      origin:
        "Carol Danvers era piloto de la Fuerza Aérea cuando un accidente con tecnología alienígena le otorgó poderes cósmicos.",
      stats: { strength: 100, intelligence: 75, speed: 95, durability: 95 },
    },
    {
      id: 6,
      name: "Doctor Strange",
      description:
        "Maestro de las artes místicas y Hechicero Supremo. Stephen Strange protege la realidad de amenazas sobrenaturales y dimensionales.",
      image: "/placeholder.svg?height=300&width=300",
      category: "Magia",
      color: "bg-indigo-500",
      powers: ["Hechicería", "Manipulación del tiempo", "Proyección astral", "Portales dimensionales"],
      origin:
        "Stephen Strange era un cirujano arrogante hasta que un accidente automovilístico dañó sus manos, llevándolo a descubrir las artes místicas.",
      stats: { strength: 40, intelligence: 95, speed: 60, durability: 70 },
    },
  ]

  const [selectedHero, setSelectedHero] = useState(null)
  const [customHeroList, setCustomHeroList] = useState(customHeroes)

  const allHeroes = [...heroes, ...customHeroList]

  const openHeroDetail = (hero) => {
    setSelectedHero(hero)
  }

  const closeHeroDetail = () => {
    setSelectedHero(null)
  }

  // Renderizar la sección activa
  if (activeSection === "profile") {
    return <ProfileSection />
  }

  if (activeSection === "history") {
    return <HistorySection />
  }

  // Vista por defecto: Galería
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Galería de Héroes</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Descubre a los héroes más legendarios y conoce sus historias extraordinarias
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allHeroes.map((hero) => (
          <Card
            key={hero.id}
            className="flex group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
            onClick={() => openHeroDetail(hero)}
          >
            <div className="relative w-[500px] flex-shrink-0">
              <Image
                src={hero.image || "/placeholder.svg"}
                alt={hero.name}
                width={500}
                height={256}
                className="w-[500px] h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4">
                <Badge className={`${hero.color} text-white border-0`}>{hero.category}</Badge>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors duration-200">
                  {hero.name}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-base leading-relaxed">{hero.description}</CardDescription>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-muted-foreground">¿Tienes un héroe favorito? ¡Descubre más sobre sus aventuras!</p>
      </div>

      <Dialog open={!!selectedHero} onOpenChange={closeHeroDetail}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedHero && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold flex items-center gap-3">
                  {selectedHero.name}
                  <Badge className={`${selectedHero.color} text-white border-0`}>{selectedHero.category}</Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="relative">
                  <Image
                    src={selectedHero.image || "/placeholder.svg"}
                    alt={selectedHero.name}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Descripción
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedHero.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Origen
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedHero.origin}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Poderes
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedHero.powers.map((power, index) => (
                      <Badge key={index} variant="secondary" className="justify-center py-2">
                        {power}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Estadísticas</h3>
                  <div className="space-y-3">
                    {Object.entries(selectedHero.stats).map(([stat, value]) => (
                      <div key={stat} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize font-medium">
                            {stat === "strength"
                              ? "Fuerza"
                              : stat === "intelligence"
                                ? "Inteligencia"
                                : stat === "speed"
                                  ? "Velocidad"
                                  : "Resistencia"}
                          </span>
                          <span>{value}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div className={`h-2 rounded-full ${selectedHero.color}`} style={{ width: `${value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// COMPONENTE DE PERFIL ACTUALIZADO
function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    firstName: "Alex",
    lastName: "Rodriguez",
    email: "alex.rodriguez@email.com",
    birthDate: "1990-05-15",
    location: "Ciudad de México, México",
    bio: "Apasionado coleccionista de héroes y fanático del universo de superhéroes. Me encanta descubrir nuevas historias y crear mis propios personajes.",
    joinDate: "Enero 2024",
    heroesViewed: 127,
    favoriteCategory: "Tecnología",
    avatar: "/placeholder.svg?height=96&width=96",
  })

  const handleSave = () => {
    setIsEditing(false)
    alert("¡Perfil actualizado exitosamente!")
    console.log("Perfil guardado:", profile)
  }

  const handleInputChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const stats = [
    { label: "Héroes Vistos", value: profile.heroesViewed, icon: Eye },
    { label: "Categoría Favorita", value: profile.favoriteCategory, icon: Star },
    { label: "Miembro desde", value: profile.joinDate, icon: Calendar },
  ]

  const fullName = `${profile.firstName} ${profile.lastName}`

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
                <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <CardTitle className="text-xl">{fullName}</CardTitle>
            <CardDescription>Coleccionista de Héroes</CardDescription>
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
            const Icon = stat.icon
            return (
              <Card key={index}>
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
            )
          })}
        </div>
      </div>
    </div>
  )
}

// NUEVO COMPONENTE DE HISTORIAL CON PAGINACIÓN
function HistorySection() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Datos de ejemplo para el historial
  const historyData = [
    {
      id: 1,
      action: "Visualizó héroe",
      hero: "Iron Man",
      date: "2024-01-15",
      time: "14:30",
      category: "Tecnología",
      color: "bg-red-500",
    },
    {
      id: 2,
      action: "Visualizó héroe",
      hero: "Wonder Woman",
      date: "2024-01-15",
      time: "14:25",
      category: "Mitología",
      color: "bg-yellow-500",
    },
    {
      id: 3,
      action: "Editó perfil",
      hero: "Perfil personal",
      date: "2024-01-15",
      time: "13:45",
      category: "Configuración",
      color: "bg-blue-500",
    },
    {
      id: 4,
      action: "Visualizó héroe",
      hero: "Spider-Man",
      date: "2024-01-14",
      time: "16:20",
      category: "Mutante",
      color: "bg-blue-500",
    },
    {
      id: 5,
      action: "Visualizó héroe",
      hero: "Black Panther",
      date: "2024-01-14",
      time: "15:10",
      category: "Realeza",
      color: "bg-purple-500",
    },
    {
      id: 6,
      action: "Visualizó héroe",
      hero: "Captain Marvel",
      date: "2024-01-14",
      time: "14:55",
      category: "Cósmico",
      color: "bg-green-500",
    },
    {
      id: 7,
      action: "Visualizó héroe",
      hero: "Doctor Strange",
      date: "2024-01-13",
      time: "18:30",
      category: "Magia",
      color: "bg-indigo-500",
    },
    {
      id: 8,
      action: "Inició sesión",
      hero: "Sistema",
      date: "2024-01-13",
      time: "18:00",
      category: "Sesión",
      color: "bg-gray-500",
    },
    {
      id: 9,
      action: "Visualizó héroe",
      hero: "Iron Man",
      date: "2024-01-12",
      time: "20:15",
      category: "Tecnología",
      color: "bg-red-500",
    },
    {
      id: 10,
      action: "Editó perfil",
      hero: "Perfil personal",
      date: "2024-01-12",
      time: "19:45",
      category: "Configuración",
      color: "bg-blue-500",
    },
    {
      id: 11,
      action: "Visualizó héroe",
      hero: "Wonder Woman",
      date: "2024-01-11",
      time: "17:30",
      category: "Mitología",
      color: "bg-yellow-500",
    },
    {
      id: 12,
      action: "Visualizó héroe",
      hero: "Spider-Man",
      date: "2024-01-11",
      time: "16:45",
      category: "Mutante",
      color: "bg-blue-500",
    },
  ]

  // Calcular paginación
  const totalPages = Math.ceil(historyData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = historyData.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case "Visualizó héroe":
        return <Eye className="h-4 w-4" />
      case "Editó perfil":
        return <Edit className="h-4 w-4" />
      case "Inició sesión":
        return <Clock className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Historial de Actividad</h2>
        <p className="text-muted-foreground">Revisa tu actividad reciente en la plataforma</p>
      </div>

      {/* Lista de actividades */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Actividad Reciente
          </CardTitle>
          <CardDescription>
            Mostrando {startIndex + 1}-{Math.min(endIndex, historyData.length)} de {historyData.length} actividades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${item.color}/10`}>{getActionIcon(item.action)}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.action}</span>
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.hero}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {new Date(item.date).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Controles de paginación */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-muted-foreground">
          Página {currentPage} de {totalPages}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToPrevious} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={goToNext} disabled={currentPage === totalPages}>
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
