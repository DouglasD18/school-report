import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Api } from "@/services/api";
import { TwoYearsSection } from "./TwoYearsSection";
import { init } from "@/redux/Notes/Notes.Store";

export function Painel() {
  const dispatch = useDispatch();

  const get = async () => {
    const api = new Api();
    const result = await api.list();
    dispatch(init(result!))
  }

  useEffect(() => {
    get();
  });

  return (
    <div className="painel">
      <TwoYearsSection bimestre={"PRIMEIRO"} position={0} />
      <TwoYearsSection bimestre={"SEGUNDO"} position={1} />
      <TwoYearsSection bimestre={"TERCEIRO"} position={2} />
      <TwoYearsSection bimestre={"QUARTO"} position={3} />
    </div>
  )
}