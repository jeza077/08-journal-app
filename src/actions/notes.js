import Swal from 'sweetalert2';
import { db } from '../firebase/firebaseConfig';
import { collection, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { types } from '../types/types';
import { loadNotes } from '../helpers/loadNotes';
import { fileUpload } from '../helpers/fileUpload';

// journal-app

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
          // console.error("Error adding document: ", e);
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

export const startSaveNote = ( note ) => {
  return async( dispatch, getState ) => {

    const { uid } = getState().auth;

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    
    if(!noteToFirestore.url){
      delete noteToFirestore.url;
    }

    try {
      
      // const ref = doc(db, `${uid}/journal/notes/${note.id}`)
      const ref = doc(db, uid, "journal", "notes", note.id);
  
      await updateDoc(ref, noteToFirestore);
  
      dispatch( refreshNote( note.id, noteToFirestore ) );
  
      Swal.fire(
        'Saved',
        note.title,
        'success'
      );

    } catch (e) {
      Swal.fire(
        'Error',
        e,
        'error'
      );
    }

  }
}

export const refreshNote = ( id, note ) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note
    }
  }
});

// Subir imagen a Cloudinary
export const startUploading = ( file ) => {
  return async (dispatch, getState) => {

    const { active:activeNote } = getState().notes;

    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    })

    const fileUrl = await fileUpload( file );
    // console.log(fileUrl)
    activeNote.url = fileUrl;

    // Subir a Firestore el url de la imagen subida a Cloudinary
    dispatch( startSaveNote( activeNote ) )

    Swal.close();

  }
}

// Eliminar nota de Firestore
export const startDeleting = ( id ) => {
  return async( dispatch, getState ) => {

    const { uid } = getState().auth;

    // const ref = doc(db, uid, "journal", "notes", note.id);
  
    await deleteDoc(doc(db, uid, "journal", "notes", id));

    // await updateDoc(ref, noteToFirestore);

    // Ejecutar para borrar la nota del Store(Redux)
    dispatch( deleteNote(id) );

  }
}

// Eliminar nota del Store (redux)
export const deleteNote = ( id ) => ({
  type: types.notesDelete, 
  payload: id
});