import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Delete from "@/../public/images/delete.svg";
import Graphic from "@/../public/images/graphic.svg";
import { Api } from "@/services/api";
import { remove } from "@/redux/Notes/Notes.Store";

type NoteCardProps = {
  nota: number;
  disciplina: string;
  data: Date;
  id: string;
}

export function NoteCard({ nota, disciplina, data, id }: NoteCardProps) {
  const dispatch = useDispatch();
  const [color, setColor] = useState<string>("green");

  const textData = () => {
    const total = data.toString();
    const ano = total.substring(0, 4);
    const mes = total.substring(5, 7);
    const dia = total.substring(8, 10);

    return `${dia}/${mes}/${ano}`;
  }

  const api = new Api();

  const deleteNote = async () => {
    await api.delete({ id });
    dispatch(remove(id));
  }

  useEffect(() => {
    if (nota < 8 && nota > 5) {
      setColor("yellow");
    } else if (nota <= 5) {
      setColor("red");
    }
  }, [nota]);

  return (
    <div className="auxiliar">
      <div className={ "note-card " + disciplina.toLowerCase() }>
        <Image className="delete" src={ Delete } alt={"Imagem de uma lixeira"} onClick={ async () => await deleteNote() } />
        <div className="disciplina">
          <p>{ disciplina }</p>
          <p>{ textData() }</p>
        </div>
        <div className={ color + " nota-bar" }>
            <Image src={ Graphic } alt={"Imagem de um gráfico"} />
          <p>
            Nota: { nota }
          </p>
        </div>
      </div>
    </div>
  )
}
