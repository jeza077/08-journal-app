import { collection, doc, setDoc } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';


export const startNewNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        try {
            const docRef = await setDoc(doc(collection(db, uid, "journal", "notes")), newNote); //Añadir: Coleccion - Documento - Coleccion - Documento - Coleccion
            console.log(docRef);
          } catch (e) {
            console.error("Error adding document: ", e);
          }

    }
}