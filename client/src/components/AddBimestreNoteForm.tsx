import { useContext, useEffect, useState } from "react";

import { title } from "./TwoYearsSection";
import { Bimestre, Disciplina } from "@/types";
import { Api } from "@/services/api";
import MyContext from "@/context/MyContext";

export interface FormTypes {
  showForm: boolean;
  bimestre: string;
}

export function AddBimestreNoteForm({ showForm, bimestre }: FormTypes) {
  const [show, setShow] = useState<string>("");
  const [disciplina, setDisciplina] = useState<Disciplina>(Disciplina.Biologia);
  const [nota, setNota] = useState<number>(0);
  const { notes, setNotes } = useContext(MyContext)!;

  const confirme = async () => {
    const api = new Api();
    const body = {
      bimestre: bimestre as Bimestre,
      disciplina,
      nota
    }

    try {
      const note = await api.add(body);
      notes.push(note!);
      setNotes(notes);
      setShow("");
    } catch (error) {
      console.assert(error);
    }
  }

  const onChangeDisciplina = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    setDisciplina(e.target.value as Disciplina);
  }

  const onChangeNota = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNota(Number(e.target.value));
  }

  useEffect(() => {
    if (showForm) {
      setShow("show");
    }
  }, [showForm]);

  return (
    <div className={ show + " form"}>
      <div>
        { title(bimestre) }
        <p onClick={() => setShow("")}>X</p>
      </div>
      <form>
        <h2>Discipline</h2>
        <select required={true} value={ disciplina } onChange={onChangeDisciplina}>
          <option selected className="biologia" value={Disciplina.Biologia}>Biologia</option>
          <option className="artes" value={Disciplina.Artes}>Artes</option>
          <option className="geografia" value={Disciplina.Geografia}>Geografia</option>
          <option className="sociologia" value={Disciplina.Sociologia}>Sociologia</option>
        </select>
        <h3>Nota</h3>
        <input type="number" max={10} min={0} required={true} onChange={onChangeNota} />
        <button onClick={() => confirme()} className="confirme">Confirmar</button>
      </form>
    </div>
  );
}
