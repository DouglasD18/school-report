import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import Delete from "@/../public/images/delete.svg";
import Graphic from "@/../public/images/graphic.svg";
import { Api } from "@/services/api";
import MyContext from "@/context/MyContext";

type NoteCardProps = {
  nota: number;
  disciplina: string;
  data: Date;
  id: string;
}

export function NoteCard({ nota, disciplina, data, id }: NoteCardProps) {
  const { notes, setNotes } = useContext(MyContext)!;
  const [color, setColor] = useState<string>("green");

  const api = new Api();

  const deleteNote = async () => {
    await api.delete({ id });
    const newNotes = notes.filter(note => note.id !== id);
    setNotes(newNotes);
  }

  useEffect(() => {
    if (nota < 8 && nota >= 6) {
      setColor("yellow");
    } else if (nota <= 5) {
      setColor("red");
    }
  }, [nota]);

  return (
    <div className={ "note-card " + disciplina.toLowerCase() }>
      <Image src={ Delete } alt={"Imagem de uma lixeira"} onClick={ async () => await deleteNote() } />
      <div>
        <p>{ disciplina }</p>
        <p>{ data.toString() }</p>
      </div>
      <div className={ color + " nota-bar" }>
        <p>
          <Image src={ Graphic } alt={"Imagem de um gráfico"} />
          Nota: { nota }
        </p>
      </div>
    </div>
  )
}
