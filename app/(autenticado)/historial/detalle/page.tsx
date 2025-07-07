"use client";

import { useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react";
import PeopleList from "../../../../components/people-list";

export default function PersonCards() {
  const historyPeopleList = useSelector((state: any) => state.personas.personas);
  return (
    <div>
      <div className="p-2 rounded-lg bg-primary/10 cursor-pointer">
        <ChevronLeft className="h-4 w-4 text-primary"></ChevronLeft>
      </div>
      <PeopleList people={historyPeopleList} />
    </div>
  );
}
