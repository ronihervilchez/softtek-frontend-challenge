"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Save, Upload, Sparkles } from "lucide-react"

interface AddHeroSectionProps {
  onHeroAdded: (hero: any) => void
}

export default function AddHeroSection({ onHeroAdded }: AddHeroSectionProps) {
  const [heroData, setHeroData] = useState({
    name: "",
    description: "",
    category: "",
    origin: "",
    image: "",
    powers: [] as string[],
    weaknesses: [] as string[],
    allies: "",
    enemies: "",
    realName: "",
    occupation: "",
    baseOfOperations: "",
    firstAppearance: "",
    stats: {
      strength: 50,
      intelligence: 50,
      speed: 50,
      durability: 50,
      energy: 50,
      fighting: 50,
    },
  })

  const [newPower, setNewPower] = useState("")
  const [newWeakness, setNewWeakness] = useState("")

  const categories = [
    "Tecnología",
    "Mitología",
    "Mutante",
    "Realeza",
    "Cósmico",
    "Magia",
    "Ciencia",
    "Militar",
    "Vigilante",
    "Alienígena",
    "Sobrenatural",
    "Otro",
  ]

  const categoryColors = {
    Tecnología: "bg-red-500",
    Mitología: "bg-yellow-500",
    Mutante: "bg-blue-500",
    Realeza: "bg-purple-500",
    Cósmico: "bg-green-500",
    Magia: "bg-indigo-500",
    Ciencia: "bg-pink-500",
    Militar: "bg-gray-500",
    Vigilante: "bg-slate-600",
    Alienígena: "bg-cyan-500",
    Sobrenatural: "bg-violet-500",
    Otro: "bg-orange-500",
  }

  const addPower = () => {
    if (newPower.trim() && !heroData.powers.includes(newPower.trim())) {
      setHeroData({
        ...heroData,
        powers: [...heroData.powers, newPower.trim()],
      })
      setNewPower("")
    }
  }

  const removePower = (powerToRemove: string) => {
    setHeroData({
      ...heroData,
      powers: heroData.powers.filter((power) => power !== powerToRemove),
    })
  }

  const addWeakness = () => {
    if (newWeakness.trim() && !heroData.weaknesses.includes(newWeakness.trim())) {
      setHeroData({
        ...heroData,
        weaknesses: [...heroData.weaknesses, newWeakness.trim()],
      })
      setNewWeakness("")
    }
  }

  const removeWeakness = (weaknessToRemove: string) => {
    setHeroData({
      ...heroData,
      weaknesses: heroData.weaknesses.filter((weakness) => weakness !== weaknessToRemove),
    })
  }

  const handleStatChange = (stat: string, value: number[]) => {
    setHeroData({
      ...heroData,
      stats: {
        ...heroData.stats,
        [stat]: value[0],
      },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!heroData.name || !heroData.description || !heroData.category) {
      alert("Por favor completa los campos obligatorios (Nombre, Descripción y Categoría)")
      return
    }

    const newHero = {
      id: Date.now(),
      ...heroData,
      image: heroData.image || "/placeholder.svg?height=300&width=300",
      color: categoryColors[heroData.category as keyof typeof categoryColors] || "bg-gray-500",
    }

    onHeroAdded(newHero)

    // Reset form
    setHeroData({
      name: "",
      description: "",
      category: "",
      origin: "",
      image: "",
      powers: [],
      weaknesses: [],
      allies: "",
      enemies: "",
      realName: "",
      occupation: "",
      baseOfOperations: "",
      firstAppearance: "",
      stats: {
        strength: 50,
        intelligence: 50,
        speed: 50,
        durability: 50,
        energy: 50,
        fighting: 50,
      },
    })

    alert("¡Héroe creado exitosamente!")
  }

  const generateRandomStats = () => {
    const randomStats = {
      strength: Math.floor(Math.random() * 51) + 50, // 50-100
      intelligence: Math.floor(Math.random() * 51) + 50,
      speed: Math.floor(Math.random() * 51) + 50,
      durability: Math.floor(Math.random() * 51) + 50,
      energy: Math.floor(Math.random() * 51) + 50,
      fighting: Math.floor(Math.random() * 51) + 50,
    }
    setHeroData({ ...heroData, stats: randomStats })
  }

  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
              <CardDescription>Datos principales de tu héroe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Héroe *</Label>
                <Input
                  id="name"
                  value={heroData.name}
                  onChange={(e) => setHeroData({ ...heroData, name: e.target.value })}
                  placeholder="Ej: Captain Thunder"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="realName">Nombre Real</Label>
                <Input
                  id="realName"
                  value={heroData.realName}
                  onChange={(e) => setHeroData({ ...heroData, realName: e.target.value })}
                  placeholder="Ej: Marcus Thompson"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                <Select
                  value={heroData.category}
                  onValueChange={(value) => setHeroData({ ...heroData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation">Ocupación</Label>
                <Input
                  id="occupation"
                  value={heroData.occupation}
                  onChange={(e) => setHeroData({ ...heroData, occupation: e.target.value })}
                  placeholder="Ej: Científico, Soldado, Estudiante"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">URL de Imagen</Label>
                <div className="flex gap-2">
                  <Input
                    id="image"
                    value={heroData.image}
                    onChange={(e) => setHeroData({ ...heroData, image: e.target.value })}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detalles Adicionales</CardTitle>
              <CardDescription>Información complementaria</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="baseOfOperations">Base de Operaciones</Label>
                <Input
                  id="baseOfOperations"
                  value={heroData.baseOfOperations}
                  onChange={(e) => setHeroData({ ...heroData, baseOfOperations: e.target.value })}
                  placeholder="Ej: Nueva York, Torre de los Vengadores"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstAppearance">Primera Aparición</Label>
                <Input
                  id="firstAppearance"
                  value={heroData.firstAppearance}
                  onChange={(e) => setHeroData({ ...heroData, firstAppearance: e.target.value })}
                  placeholder="Ej: Amazing Fantasy #15 (1962)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allies">Aliados</Label>
                <Input
                  id="allies"
                  value={heroData.allies}
                  onChange={(e) => setHeroData({ ...heroData, allies: e.target.value })}
                  placeholder="Ej: Los Vengadores, X-Men"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="enemies">Enemigos</Label>
                <Input
                  id="enemies"
                  value={heroData.enemies}
                  onChange={(e) => setHeroData({ ...heroData, enemies: e.target.value })}
                  placeholder="Ej: Doctor Doom, Magneto"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Descripción *</CardTitle>
            <CardDescription>Descripción general del héroe</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={heroData.description}
              onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
              placeholder="Describe brevemente a tu héroe, sus motivaciones y personalidad..."
              rows={4}
              required
            />
          </CardContent>
        </Card>

        {/* Origin Story */}
        <Card>
          <CardHeader>
            <CardTitle>Historia de Origen</CardTitle>
            <CardDescription>El trasfondo de tu héroe</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={heroData.origin}
              onChange={(e) => setHeroData({ ...heroData, origin: e.target.value })}
              placeholder="Cuenta la historia de cómo obtuvo sus poderes y se convirtió en héroe..."
              rows={6}
            />
          </CardContent>
        </Card>

        {/* Powers and Weaknesses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Poderes y Habilidades</CardTitle>
              <CardDescription>Define las habilidades especiales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newPower}
                  onChange={(e) => setNewPower(e.target.value)}
                  placeholder="Ej: Vuelo, Superfuerza, Telepatía..."
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addPower())}
                />
                <Button type="button" onClick={addPower}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {heroData.powers.map((power, index) => (
                  <Badge key={index} variant="default" className="gap-1">
                    {power}
                    <button type="button" onClick={() => removePower(power)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Debilidades</CardTitle>
              <CardDescription>Limitaciones y vulnerabilidades</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newWeakness}
                  onChange={(e) => setNewWeakness(e.target.value)}
                  placeholder="Ej: Kriptonita, Magia, Fuego..."
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addWeakness())}
                />
                <Button type="button" onClick={addWeakness}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {heroData.weaknesses.map((weakness, index) => (
                  <Badge key={index} variant="destructive" className="gap-1">
                    {weakness}
                    <button type="button" onClick={() => removeWeakness(weakness)} className="ml-1 hover:text-white">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Estadísticas</CardTitle>
                <CardDescription>Define las capacidades de tu héroe (0-100)</CardDescription>
              </div>
              <Button type="button" variant="outline" onClick={generateRandomStats} className="gap-2 bg-transparent">
                <Sparkles className="h-4 w-4" />
                Generar Aleatorio
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(heroData.stats).map(([stat, value]) => (
              <div key={stat} className="space-y-2">
                <div className="flex justify-between">
                  <Label className="capitalize">
                    {stat === "strength"
                      ? "Fuerza"
                      : stat === "intelligence"
                        ? "Inteligencia"
                        : stat === "speed"
                          ? "Velocidad"
                          : stat === "durability"
                            ? "Resistencia"
                            : stat === "energy"
                              ? "Proyección de Energía"
                              : "Habilidad de Combate"}
                  </Label>
                  <span className="text-sm text-muted-foreground font-mono">{value}%</span>
                </div>
                <Slider
                  value={[value]}
                  onValueChange={(newValue) => handleStatChange(stat, newValue)}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setHeroData({
                name: "",
                description: "",
                category: "",
                origin: "",
                image: "",
                powers: [],
                weaknesses: [],
                allies: "",
                enemies: "",
                realName: "",
                occupation: "",
                baseOfOperations: "",
                firstAppearance: "",
                stats: { strength: 50, intelligence: 50, speed: 50, durability: 50, energy: 50, fighting: 50 },
              })
            }}
          >
            Limpiar Formulario
          </Button>
          <Button type="submit" className="gap-2">
            <Save className="h-4 w-4" />
            Crear Héroe
          </Button>
        </div>
      </form>
    </div>
  )
}
