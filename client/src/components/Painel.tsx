import { useContext, useEffect } from "react";

import MyContext from "@/context/MyContext";
import { Api } from "@/services/api";
import { TwoYearsSection } from "./TwoYearsSection";

export function Painel() {
  const { setNotes } = useContext(MyContext)!;

  const get = async () => {
    const api = new Api();
    const result = await api.list();
    setNotes(result!);
  }

  useEffect(() => {
    get();
  })

  return (
    <div className="painel">
      <TwoYearsSection bimestre={"PRIMEIRO"} />
      <TwoYearsSection bimestre={"SEGUNDO"} />
      <TwoYearsSection bimestre={"TERCEIRO"} />
      <TwoYearsSection bimestre={"QUARTO"} />
    </div>
  )
}