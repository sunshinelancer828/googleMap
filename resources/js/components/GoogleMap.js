import React, {Component} from 'react'

export default class GoogleMap extends Component {
    constructor(props) {
        super(props)
        this.updateMarkers = this.updateMarkers.bind(this);
        this.map = null;
    }

    componentDidMount() {
        
        this.map = new window.google.maps.Map(document.getElementById('rest'), {
            zoom: 5,
            center: this.props.standort,
        });
        new window.google.maps.Marker({position: this.props.standort, map: this.map, icon: this.props.imgPath});
        this.updateMarkers();
    }
    componentDidUpdate() {
        var rest = document.getElementById('rest');
        if (this.props.status === "") {
            this.updateMarkers();
            if (rest && rest.children[0]) {
                rest.children[0].classList.remove("invisible");
            }
        } else {
            if (rest && rest.children[0]) {
                rest.children[0].classList.add("invisible");
            }
        }
        if (rest.clientHeight < 200) {
            rest.classList.add("invisible");
        } else {
            rest.classList.remove("invisible");
        }
    }

    updateMarkers() {
        this.newMarkers = [];

        for (var j = 0; j < this.props.notdienste.length; j++) {
            var notdienst = this.props.notdienste[j];
            var marker = new window.google.maps.Marker({
                label: notdienst.marker,
                position: {
                    lat: notdienst.lat,
                    lng: notdienst.lng
                },
                map: this.map
            });
            this.newMarkers.push(marker);
        }

        var bounds = new window.google.maps.LatLngBounds();
        for (var i = 0; i < this.newMarkers.length; i++) {
            bounds.extend(this.newMarkers[i].getPosition());
        }

        if (this.map) {
            this.map.fitBounds(bounds);
        }

        window.google.maps.event.trigger(this.map, "resize");
        if (this.markers) {
            this.markers.forEach(function (marker) {
                marker.setMap(null);
            });
        }
        this.markers = this.newMarkers;
    }

    render() {
        return (
            <div className='h-100' id="rest"></div>
        )
    }
}
