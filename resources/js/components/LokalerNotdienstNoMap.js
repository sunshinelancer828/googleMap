import React from 'react'

function LokalerNotdienstNoMap(props) {
    const datumOptionen = {
        year: "numeric",
        month: "2-digit",
        weekday: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    };

    return (
        <div className='col-md-6 pbt-10'>
            <div className='pharmacyBox'>
                <div className='pharmacyName'>
                    <div><h1>{props.notdienst.name}</h1></div>
                </div>
                <div className='row redBackground'>
                    <p className='pharmacyAdress fitLarge'>
                        <h2>{"HEUTE HIER NOTDIENST!"}</h2>
                    </p>
                </div>
                <div className='pharmacyFooter'>
                    <div className='col-xs-12' style={{padding: '0px'}}>
                        <h5 className='fitSmall'>{ "Dienstbereit bis " + props.notdienst.bis.toLocaleDateString("de-de", datumOptionen) + " Uhr" }</h5>
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default LokalerNotdienstNoMap
