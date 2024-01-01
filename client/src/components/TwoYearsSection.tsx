import { useContext, useEffect, useState } from "react";
import Image from "next/image";

import MyContext from "@/context/MyContext";
import { Bimestre, Note } from "@/types";
import { NoteCard } from "./NoteCard";
import Add from "@/../public/images/add.svg";
import { AddBimestreNoteForm } from "./AddBimestreNoteForm";

type TwoYearsSectionProps = {
  bimestre: string
}

export const title = (bimestre: string) => {
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

export function TwoYearsSection({ bimestre }: TwoYearsSectionProps) {
  const { notes } = useContext(MyContext)!;
  const [notesToRender, setNotesToRender] = useState<Note[] | undefined>(undefined);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    if (notes) {
      const toRender = notes.filter(note => note.bimestre === bimestre);
      setNotesToRender(toRender);
    }
  }, [notes, bimestre])

  return (
    <div className="section">
      <div>
        { title(bimestre) }
        <button>
          <Image
            src={ Add }
            alt={"Imagem de uma sinal de mais"}
            onClick={ () => setShowForm(true) }
          />
        </button>
      </div>
      <div className="section-cards">
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

      <AddBimestreNoteForm showForm={ showForm } bimestre={ bimestre } />
    </div>
  )
}
