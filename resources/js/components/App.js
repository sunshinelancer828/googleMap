import React from 'react';
import Notdienstanzeige from './Notdienstanzeige';

function App() {
    return (
        <div className="App h-100">
            <Notdienstanzeige
                imgPath="/images/"
                contextPath="/lakbwportal"
                uuid="ggsDB"
                loadingMessage="Could not load..."
                pharmacyId=""
                showMap={true}
                lat={49.1249712}
                lon={8.5844108}
                loadingCode={0}/>
        </div>
    );
}

export default App;
