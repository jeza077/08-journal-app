import React from 'react';
import { useSelector } from 'react-redux';
import { NoteScreen } from '../notes/NoteScreen';
import { Sidebar } from './Sidebar';
import { NothingSelected } from './NothingSelected';

export const JournalScreen = () => {

    const { active } = useSelector(state => state.notes);

    return (
        <div className="journal__main-content">
            
            <Sidebar />

            <main>

                {
                    ( active ) // Si es distinto a null o trae algo ACTIVE (if)
                        ? ( <NoteScreen /> ) // Ejecutara esto (...retorno del if)
                        : ( <NothingSelected /> ) // Sino ejecutara esto (else)
                }                

            </main>

        </div>
    )
}
