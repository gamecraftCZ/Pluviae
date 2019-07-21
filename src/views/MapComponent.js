import React, { Component } from "react";
import L from 'leaflet';
import Map from "./Map";
import axios from "axios";

export default class MapComponent extends Component {
    state = {
        mapHeight: window.innerHeight - 18,
        map: false,
    };


    async componentDidMount() {
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


        const url = "https://3247f322-d1ab-44f2-9950-8a8ef2802387-bluemix.cloudantnosqldb.appdomain.cloud/sensors/_all_docs";
        const auth = {
            username: "3247f322-d1ab-44f2-9950-8a8ef2802387-bluemix",
            password: "d9be3c9dee4dca6c97c00b8718af528264302ad33b3b508a6639d17579350e2a",
        };
        const params = {
            include_docs: true,
        };

        axios.get(url, {auth, params}).then(data => {
                // console.warn(data);

                let items = data.data.rows;
                // console.log(items);
                items = items.map(item => item.doc);
                console.log(items);

                items.map(item => {
                    L.marker(item.location).addTo(this.state.map);
                    let color = "white";
                    switch(item.waterQuality) {
                        case 1:
                        case 2:
                        case 3:
                            color = "green";
                            break;
                        case 4:
                        case 5:
                        case 6:
                            color = "orange";
                            break;
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                            color = "red";
                            break;
                    }
                    L.polygon(item.boundaries, {color}).addTo(this.state.map);

                    console.log("Added to map: ", item);
                });
            }
        ).catch(error => {
            console.error("Cant get data, ", error)
        });

    }


    render() {
        return (
            <div className="MapComponent">
                <Map mapHeight={this.state.mapHeight} />
            </div>
        );
    }
}
