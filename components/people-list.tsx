import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Film, Globe, GraduationCap, Ruler, User, Users, Weight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { IPerson } from "../interfaces/person.interface";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { DialogHeader } from "./ui/dialog";

export default function PeopleList({ people }: { readonly people: IPerson[] }) {
  const [selectedPerson, setSelectedPerson] = useState<IPerson | null>(null);

  const openPersonDetail = (person: IPerson) => {
    setSelectedPerson(person);
  };

  const closePersonDetail = () => {
    setSelectedPerson(null);
  };

  const getDescription = (person: IPerson) => {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Galería de Personajes</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Descubre a los personajes más legendarios de Star Wars y conoce sus historias
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {people.map((person) => (
          <Card
            key={person.nombre}
            className="flex group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
            onClick={() => openPersonDetail(person)}
          >
            <div className="relative w-[300px] flex-shrink-0">
              <Image
                src={person.imagen ?? "/placeholder.svg"}
                alt={person.nombre}
                width={300}
                height={256}
                className="w-[300px] h-64 object-cover"
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
