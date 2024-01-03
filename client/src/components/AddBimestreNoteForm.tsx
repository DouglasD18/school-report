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

  const confirme = async () => {
    const api = new Api();
    const body = {
      bimestre: bimestre as Bimestre,
      disciplina,
      nota
    }

    try {
      const note = await api.add(body);
      dispatch(add(note!));
      dispatch(change({ position, state: false }));
    } catch (error) {
      console.assert(error);
    }
  }

  const onChangeDisciplina = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setDisciplina(e.target.value as Disciplina);
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
            <h2>Discipline</h2>
            <div className="disciplinas">
              <button
                type="button"
                className="biologia"
                value={Disciplina.Biologia}
                onClick={ () => onChangeDisciplina }
              >Biologia</button>
              <button
                type="button"
                className="artes"
                value={Disciplina.Artes}
                onClick={ () => onChangeDisciplina }
              >Artes</button>
              <button
                type="button"
                className="geografia"
                value={Disciplina.Geografia}
              >Geografia</button>
              <button
                type="button"
                className="sociologia"
                value={Disciplina.Sociologia}
              >Sociologia</button>
            </div>
            <h3>Nota</h3>
            <input type="number" max={10} min={0} required={true} onChange={onChangeNota} value={ nota } />
            <button
              onClick={() => confirme()}
              className="confirme"
            >Confirmar</button>
          </form>
        </div>
      </div>
    );
  } else {
    return <></>
  }

}
