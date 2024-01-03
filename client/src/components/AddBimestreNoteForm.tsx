import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { title } from "./TwoYearsSection";
import { Bimestre, Disciplina } from "@/types";
import { Api } from "@/services/api";
import { RootState } from "@/redux/store";
import { add } from "@/redux/Notes/Notes.Store";
import { change } from "@/redux/AddBimestre/AddBimestre.Store";

export interface FormTypes {
  bimestre: string;
  position: number;
}

export function AddBimestreNoteForm({ bimestre, position }: FormTypes) {
  const [disciplina, setDisciplina] = useState<Disciplina>(Disciplina.Biologia);
  const [nota, setNota] = useState<number>(0);
  const dispatch = useDispatch();
  const addBimestreNote = useSelector((state: RootState) => state.addBimestre);
  const notes = useSelector((state: RootState) => state.notes);

  const confirme = async () => {
    const exists = notes.find(note => {
      if (note.bimestre === bimestre && note.disciplina === disciplina) {
        return true
      } 

      return false;
    })

    if (!exists) {
      const api = new Api();
      const body = {
        bimestre: bimestre as Bimestre,
        disciplina,
        nota
      }

      try {
        const note = await api.add(body);
        
        setNota(0);
        setDisciplina(Disciplina.Biologia);
        dispatch(add(note!));
        dispatch(change({ position, state: false }));
      } catch (error) {
        console.assert(error);
      }
    } else {
      window.alert("Já existe nota para essa disciplina nesse bismestre!");
    }
  }

  const onClickDisciplina = (value: string) => {
    setDisciplina(value as Disciplina);
  }

  const onChangeNota = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNota(Number(e.target.value));
  }

  if (addBimestreNote[position]) {
    return (
      <div className="form">
        <div className="form-content">
          <div className="header">
            { title(bimestre) }
            <p onClick={() => {
              dispatch(change({ position, state: false }));
            }}>X</p>
          </div>
          <form>
            <div>
              <h2>Disciplina</h2>
              <div className="disciplinas">
                <button
                  type="button"
                  className="biologia"
                  onClick={ () => onClickDisciplina(Disciplina.Biologia) }
                >Biologia</button>
                <button
                  type="button"
                  className="artes"
                  onClick={ () => onClickDisciplina(Disciplina.Artes) }
                >Artes</button>
                <button
                  type="button"
                  className="geografia"
                  onClick={ () => onClickDisciplina(Disciplina.Geografia) }
                >Geografia</button>
                <button
                  type="button"
                  className="sociologia"
                  onClick={ () => onClickDisciplina(Disciplina.Sociologia) }
                >Sociologia</button>
              </div>
            </div>
            <div>
              <h3>Nota</h3>
              <input type="number" max={10} min={0} required={true} onChange={onChangeNota} value={ nota } step=".1" />
            </div>
            <div
              onClick={() => confirme()}
              className="confirme"
            >Confirmar</div>
          </form>
        </div>
      </div>
    );
  } else {
    return <></>
  }

}
