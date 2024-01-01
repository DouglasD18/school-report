import { useContext, useEffect, useState } from "react";
import Image from "next/image";

import MyContext from "@/context/MyContext";
import { Bimestre, Note } from "@/types";
import { NoteCard } from "./NoteCard";
import Add from "@/../public/images/add.svg";
import { AddBimestreNoteForm, FormTypes } from "./AddBimestreNoteForm";

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

export function TwoYearsSection({ bimestre, position }: FormTypes) {
  const { notes, addBimestreNote, setAddBimestreNote } = useContext(MyContext)!;
  const [notesToRender, setNotesToRender] = useState<Note[] | undefined>(undefined);

  const onClick = () => {
    addBimestreNote[position] = true;
    setAddBimestreNote(addBimestreNote);
  }

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
        <button onClick={ () => onClick() }>
          {"Lançar nota "}
          <Image
            src={ Add }
            alt={"Imagem de uma sinal de mais"}
          />
        </button>
      </div>
      <div className="section-cards">
        { notesToRender && notesToRender.map(note => (
          <NoteCard
            nota={ note.nota }
            disciplina={ note.disciplina }
            data={ note.criadoEm }
            id={ note.id }
            key={ note.id }
          />
        )) }
      </div>

      <AddBimestreNoteForm position={ position } bimestre={ bimestre } />
    </div>
  )
}
