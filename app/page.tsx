"use client"

import { useState } from "react"
import MainLayout from "../components/main-layout"
import Component from "../hero-cards"

export default function Page() {
  const [customHeroes, setCustomHeroes] = useState([])

  const handleHeroAdded = (newHero: any) => {
    setCustomHeroes((prev) => [...prev, newHero])
  }

  return (
    <MainLayout>
      <Component customHeroes={customHeroes} onHeroAdded={handleHeroAdded} />
    </MainLayout>
  )
}
