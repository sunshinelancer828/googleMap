import React, {useEffect, useState} from 'react'
import LakLogo from './LakLogo';
import Clock from './Clock';
import $ from "jquery";
import Notdienste from './Notdienste';
import GoogleMap from './GoogleMap';
import Footer from './Footer';

const Notdienstanzeige = (props) => {
    const initialState = {
        notdienste: [],
        lastRefresh: new Date(),
        status: "",
        display: false
    }

    const [state, setState] = useState(initialState);
    const indexZeichen = ["[A]", "[B]", "[C]", "[D]"];
    const indexBuchstabe = ["A", "B", "C", "D"];
    var version = "";
    const reloadNotdiensteInterval = 15 * 60000; // 15 minute
    const renderNotdiensteInterval = 60000; // 1 minute
    const versionCheckInterval = 15 * 60000; // 15 minutes
    const notdienstePerDay = 4;
    const showMap = props.showMap;
    const standardHighZip = ['76646'];
    const standardLowZip = ['75015', '76351'];
    var crossProduct = [];
    const highZip = [];
    const middleZip = [];
    const lowZip = [];
    var priorities = [];

    const cacheNotdiensteKey = "notdienste" + props.uuid;
    // const cacheEntfernungenKey = "entfernungen" + props.uuid;

    const firstStart = true;
    const location = new window.google.maps.LatLng(props.lat, props.lon);

    var showQrCode = true;
    if (getUrlVars()['qrcode'] !== undefined && getUrlVars()['qrcode'] === '0') {
        showQrCode = false;
    }

    const ladeNotdienste = () => {
        $.ajax({
            url: '/api',
            method: "GET",
            crossDomain: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            dataType: 'xml',
            timeout: 50000, // timeout after 50 secs
            success: function (result, code, request) {
                $(result).find('entry').each(function() {
                    var object = {
                        id: $(this).find('id').text(),
                        from: $(this).find('from').text(),
                        to: $(this).find('to').text(),
                        name: $(this).find('name').text(),
                        street: $(this).find('street').text(),
                        zipCode: $(this).find('zipCode').text(),
                        location: $(this).find('location').text(),
                        subLocation: $(this).find('subLocation').text(),
                        phone: $(this).find('phone').text(),
                        lat: parseFloat($(this).find('lat').text()),
                        lon: parseFloat($(this).find('lon').text())
                    }
                    if (standardHighZip.includes($(this).find('zipCode').text())) {
                        highZip.push(object)
                    } else if (standardLowZip.includes($(this).find('zipCode').text())) {
                        lowZip.push(object)
                    } else {
                        middleZip.push(object)
                    }
                });

                if (highZip.length >= 4) {
                    priorities = highZip.slice(0, notdienstePerDay);
                } else {
                    priorities = highZip;
                    var rest = 4 - priorities.length;
                    if (middleZip.length > rest) {
                        for (var i = 0; i < rest; i ++) {
                            priorities.push(middleZip[i]);
                        }
                    } else {
                        for (var n = 0; n < middleZip.length; n ++) {
                            priorities.push(middleZip[n]);
                        }
                        var lowNumber = 4 - priorities.length;
                        if (lowZip.length > lowNumber) {
                            for (var j = 0; j < lowNumber; j ++) {
                                priorities.push(lowZip[j]);
                            }
                        } else {
                            for (var k = 0; k < lowZip.length; k ++) {
                                priorities.push(lowZip[k]);
                            }
                        }
                    }
                }
                setState({notdienste: state.notdienste, lastRefresh: new Date(), status: "", display: false});
                saveDataInCache(priorities);
                var date = new Date(request.getResponseHeader('date'));
                var localDate = new Date();
                if (date.getTime() - localDate.getTime() > 300000 || date.getTime() - localDate.getTime() < -300000) {
                    alert('Bitte überprüfen Sie Ihre Systemzeit!');
                }
            },
            error: function (error) {
                setState({notdienste: state.notdienste, lastRefresh: state.lastRefresh, status: "Notdienstdaten konnten nicht aktualisiert werden. Bitte überprüfen Sie Ihre Internetverbindung.", display: state.display});
            }
        });
    }

    const saveDataInCache = (data) => {
        localStorage.setItem(cacheNotdiensteKey, JSON.stringify(data));
        if (firstStart) {
            loadDataFromCache();
        }
    }

    const loadDataFromCache = () => {
        var data = JSON.parse(localStorage.getItem(cacheNotdiensteKey));
        if (!data) {
            data = {
                entries: []
            };
        }

        processData(data, new Date());
    }

    const processData = (data, now) => {
        var array = [];

        for (var i = 0; i < data.length; i++) {
            var entry = data[i];

            var notdienst = {
                index: indexZeichen[i],
                marker: indexBuchstabe[i],
                id: entry.id,
                name: entry.name,
                strasse: entry.street,
                plz: entry.zipCode,
                stadt: entry.location,
                ot: entry.subLocation,
                tel: entry.phone,
                von: entry.from,
                bis: entry.to,
                entfernung: "", // will be replaced later
                lat: entry.lat,
                lng: entry.lon
            };

            array.push(notdienst);
        }
        setState({
            notdienste: array,
            lastRefresh: state.lastRefresh,
            status: state.status,
            display: array.length > 0
        });


        if (array.length > 0) {
            getDistances(array, location);
        }
    }

    const getDistances = (array, standort) => {
        const deg2rad = (deg) => {
            return deg * (Math.PI / 180);
        }

        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2 - lat1); // deg2rad below
            var dLon = deg2rad(lon2 - lon1);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km
            return d;
        }

        array.forEach(function (notdienst) {
            var dist = calculateDistance(standort.lat(), standort.lng(), notdienst.lat, notdienst.lng);
            notdienst.entfernung = {
                text: "",
                value: dist
            };
        });

        array.sort(function (dienst1, dienst2) {
            return dienst1.entfernung.value - dienst2.entfernung.value;
        });

        for (var i = 0; i < array.length; i++) {
            array[i].index = indexZeichen[i];
            array[i].marker = indexBuchstabe[i];
        }

        // setState({notdienste: array, lastRefresh: state.lastRefresh, status: state.status, display: state.display});
    }

    const checkCurrentVersion = (successCallback) => {
        $.ajax({url: `/version`, type: 'GET', success: successCallback});
    }

    const checkForUpdate = () => {
        var callback = function callback(result) {
            if (version === "") {
                version = result;
            }
            if (result !== version) {
                location.reload(true);
            }
        };
        checkCurrentVersion(callback);
    }

    const reloadPage = () => {
        var callback = function callback(result) {
            location.reload(true);
        };
        checkCurrentVersion(callback);
    }

    // const getMilsUntilHour = (hour) => {
    //     var now = new Date();
    //     var then = new Date();

    //     then.setHours(hour, 0, 0, 0);

    //     if (now > then) {
    //         then.setDate(now.getDate() + 1);
    //     }

    //     return then.getTime() - now.getTime();
    // }

    useEffect(() => {
        if (props.loadingCode === 0) {
            checkForUpdate();
            setInterval(checkForUpdate, versionCheckInterval);
            ladeNotdienste();
            setInterval(ladeNotdienste, reloadNotdiensteInterval);

            setInterval(loadDataFromCache, renderNotdiensteInterval);

            setTimeout(reloadPage, 24 * 60 * 60 * 1000);
        } else {
            alert(props.loadingMessage);
        }
    }, [])

    return (
        <div style={
            {
                display: "flex",
                height: "100%"
            }
        }>
        <LakLogo
            path={props.imgPath + 'lak-logo.jpg'}
            display={state.display}/>
            {(() =>
            state.display ? (<div className="notdienstanzeige">
                <div id="header" width="100%">
                    <h3 className="siteHeader">
                        Apothekennotdienste in Ihrer Nähe
                    </h3>
                    <Clock/>
                </div>
                {(() =>
                    showMap ? (<div style={{ flexGrow: "1", position: "relative"}}>
                        <div className="col-md-6 pos-abs h-100" style={{overflow: 'auto'}}>
                            <Notdienste
                                notdienste={state.notdienste}
                                crossProduct={crossProduct}
                                showMap={showMap}
                            />
                        </div>
                        <div className="col-md-6 h-100 pos-abs l-50 mapsContainer">
                            <GoogleMap
                                notdienste={state.notdienste}
                                standort={location}
                                imgPath={props.imgPath + "marker.png"}
                                status={state.status}
                            />
                        </div>
                    </div>) :
                    (<div style={{flexGrow: "1", position: "relative"}}>
                        <div className="col-md-12 h-100">
                            <Notdienste
                                notdienste={state.notdienste}
                                crossProduct={crossProduct}
                                showMap={showMap}
                            />
                        </div>
                    </div>)
                )()}
                <Footer lastRefresh={state.lastRefresh} status={state.status} />
            </div>) : ""
            )()}
        </div>
    )
}

const getUrlVars = () => {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return parts;
}

export default Notdienstanzeige
