import MyContext from "@/context/MyContext";
import { Bimestre, Note } from "@/types";
import { useContext, useEffect, useState } from "react";
import { NoteCard } from "./NoteCard";

type TwoYearsSectionProps = {
  bimestre: string
}

export function TwoYearsSection({ bimestre }: TwoYearsSectionProps) {
  const { notes } = useContext(MyContext)!;
  const [notesToRender, setNotesToRender] = useState<Note[] | undefined>(undefined);

  const title = () => {
    let value;
    if (bimestre === Bimestre.PRIMEIRO) {
      value = "Bimestre 1";
    } else if (bimestre === Bimestre.SEGUNDO) {
      value = "Bimestre 2";
    } else if (bimestre === Bimestre.TERCEIRO) {
      value = "Bimestre 3";
    } else {
      value = "Bimestre 4";
    }

    return <h1>{ value }</h1>
  }

  useEffect(() => {
    const toRender = notes.filter(note => note.bimestre === bimestre);
    setNotesToRender(toRender);
  }, [notes, bimestre])

  return (
    <div className="section">
      { title() }
      { notesToRender && notesToRender.map(note => (
        <NoteCard
          nota={ note.nota }
          disciplina={ note.disciplina }
          data={ note.atualizadoEm }
          id={ note.id }
          key={ note.id }
        />
      )) }
    </div>
  )
}
