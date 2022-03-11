import React from 'react'

function LokalerNotdienst(props) {
    const datumOptionen = {
        year: "numeric",
        month: "2-digit",
        weekday: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    };

    // useEffect(() => {
    //     var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    //     if (h > 900) {
    //         var f = fitty('.fit', {maxSize: 50});
    //         var fSmall = fitty('.fitSmall', {maxSize: 30});
    //         var fLagre = fitty('.fitLarge', {maxSize: 70});
    //     } else if (h > 650) {
    //         var f = fitty('.fit', {maxSize: 31});
    //         var fSmall = fitty('.fitSmall', {maxSize: 19});
    //         var fLagre = fitty('.fitLarge', {maxSize: 45});
    //     } else if (h > 500) {
    //         var f = fitty('.fit', {maxSize: 22});
    //         var fSmall = fitty('.fitSmall', {maxSize: 14});
    //         var fLagre = fitty('.fitLarge', {maxSize: 35});
    //     } else {
    //         var f = fitty('.fit', {maxSize: 16});
    //         var fSmall = fitty('.fitSmall', {maxSize: 10});
    //         var fLagre = fitty('.fitLarge', {maxSize: 30});
    //     }
    // }, [])

    return (
        <div className='col-xs-12 h-25 pbt-10'>
            <div className='pharmacyBox'>
                <div className='pharmacyName'>
                    <div><span className='fit'>{props.notdienst.index + " " + props.notdienst.name}</span></div>
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

export default LokalerNotdienst
