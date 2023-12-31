import { useContext, useEffect, useState } from "react";
import Image from "next/image";

import { Bimestre, Note } from "@/types";
import { NoteCard } from "./NoteCard";
import Add from "@/../public/images/add.svg";
import { AddBimestreNoteForm, FormTypes } from "./AddBimestreNoteForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { change } from "@/redux/AddBimestre/AddBimestre.Store";

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
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes);
  const [notesToRender, setNotesToRender] = useState<Note[] | undefined>(undefined);

  const onClick = () => {
    if (!notesToRender || notesToRender.length < 4) {
      dispatch(change({ position, state: true }));
    } else {
      window.alert("Delete uma nota para que possa adicionar outra!");
    }
  }

  useEffect(() => {
    if (notes) {
      const toRender = notes.filter(note => note.bimestre === bimestre);
      setNotesToRender(toRender.sort((curr, acc) => {
        if (curr.disciplina > acc.disciplina) {
          return 1
        }
        return -1;
      }));
    }
  }, [notes, bimestre])

  return (
    <div className="section">
      <div className="title">
        { title(bimestre) }
        <button onClick={ () => onClick() }>
          <p>Lançar nota </p>
          <Image
            src={ Add }
            alt={"Imagem de uma sinal de mais"}
            width="16"
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
