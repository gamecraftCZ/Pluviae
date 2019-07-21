import React, { Component } from "react";
import L from 'leaflet';
import Map from "./Map";

export default class MapComponent extends Component {
    state = {
        mapHeight: window.innerHeight - 18,
        map: false,
    };


    componentDidMount() {
        // Leaflet map setup
        this.setState(
            {
                map: L.map('map', {
                    center: [37.775539, -120.6],
                    zoom: 10,
                    zoomControl: true,
                }),
            },
            () => {
                L.tileLayer(
                    'https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png',
                    {
                        detectRetina: true,
                        maxZoom: 20,
                        maxNativeZoom: 17,
                    }
                ).addTo(this.state.map);
            }
        );


    }


    render() {
        return (
            <div className="MapComponent">
                <Map mapHeight={this.state.mapHeight} />
            </div>
        );
    }
}
