import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from "firebase/firestore";


export const loadNotes = async( uid ) => {

    // Mostrar datos de journal, notes de un usuario especifico
    const notesSnap = await getDocs(collection(db, uid, "journal", "notes"));
    const notes = [];

    notesSnap.forEach((snapHijo) => {
        // Llenar el array con los datos que vienen de Firestore
        notes.push({
            id: snapHijo.id, 
            ...snapHijo.data()
        })
    });


    return notes;

}