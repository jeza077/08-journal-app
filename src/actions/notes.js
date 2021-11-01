import { db } from '../firebase/firebaseConfig';
import { collection, doc, setDoc } from "firebase/firestore";
import { types } from '../types/types';
import { loadNotes } from '../helpers/loadNotes';


// Add new note
export const startNewNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        try {
            // const docRef = await setDoc(doc(collection(db, uid, "journal", "notes")), newNote); //Añadir: Coleccion - Documento - Coleccion - Documento - Coleccion

            const docRef = doc(collection(db, uid, "journal", "notes")); //Añadir: Coleccion - Documento - Coleccion - Documento - Coleccion
            await setDoc(docRef, newNote);
            // console.log(docRef);

            dispatch( activeNote(docRef.id, newNote) );

          } catch (e) {
            console.error("Error adding document: ", e);
          }

    }
}

export const activeNote = ( id, note ) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  }
});

export const startLoadingNotes = ( uid ) => {
  return async(dispatch) => {

    const notes = await loadNotes( uid );
    dispatch( setNotes(notes) );

  }
}

export const setNotes = ( notes ) => ({
  type: types.notesLoad,
  payload: notes
});