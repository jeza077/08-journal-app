import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";

import { useDispatch } from 'react-redux';
  
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../firebase/firebaseConfig';

import { login } from '../actions/auth';
import { JournalScreen } from '../components/journal/JournalScreen';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();
    
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        
        onAuthStateChanged(auth, async(user) => {

            if( user?.uid ){
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );

                dispatch( startLoadingNotes( user.uid ) );

            } else {
                setIsLoggedIn( false );
            }

            setChecking(false);

        });

    }, [ dispatch, setChecking, setIsLoggedIn ])


    if( checking ){
        return(
            <h1>Wait...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        path="/auth"
                        isAuthenticated={ isLoggedIn }
                        component={ AuthRouter }
                    />

                    <PrivateRoute 
                        exact
                        path="/"
                        isAuthenticated={ isLoggedIn }
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />
                    
                </Switch>
            </div>
        </Router>
    )
}
