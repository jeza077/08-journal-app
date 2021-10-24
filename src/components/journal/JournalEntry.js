import React from 'react';

export const JournalEntry = () => {
    return (
        <div className="journal__entry">
            
            <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://images.unsplash.com/photo-1544526226-d4568090ffb8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGQlMjBpbWFnZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80)'
                }}
            ></div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Un nuevo día 
                </p>
                <p className="journal__entry-content">
                    Minim aute consequat ad Lorem irure cupidatat quis consequat consequat cillum id fugiat deserunt laboris.
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>

        </div>
    )
}
