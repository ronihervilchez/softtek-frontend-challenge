"use client";

import { useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react";
import PeopleList from "../../../../components/people-list";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PersonCards() {
  const historyPeopleList = useSelector((state: any) => state.personas.personas);
  const router = useRouter();

  useEffect(() => {
    if (!historyPeopleList?.length) router.push("/historial");
  }, []);

  return (
    <div>
      <div
        className="p-2 rounded-lg bg-primary/10 cursor-pointer w-8 ml-[77px] mt-5"
        onClick={() => router.back()}
      >
        <ChevronLeft className="h-4 w-4 text-primary"></ChevronLeft>
      </div>
      <PeopleList people={historyPeopleList} />
    </div>
  );
}
