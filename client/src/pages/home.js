import axios from "axios"
import { Component, useMemo } from "react"
import { redirect } from "react-router-dom";
import { useLoadScript, GoogleMap } from "@react-google-maps/api";
import '../App.css';

export const pageLoader = async () => {
    console.log('homeLoaderCalled');
    let user
    await axios.get('api/get')
        .then(result => {
            result.data.loggedIn ?
                user = true :
                user = false;
        }).catch(() => user = false);
    if (!user) {
        console.log('User', user);
        return redirect('/login');
    }
    return null;

}


function Map() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.API_KEY,
    });
    const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

    return (
        <div id="map">
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                    mapContainerClassName="map-container"
                    center={center}
                    zoom={10}
                />
            )}
        </div>
    );
};

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchData: [],
            loggedIn: null,
            message: '',
        };
    }
    componentDidMount() {
    }
    render() {
        return (
            <>
                <div>Home</div>
                <Map />
            </>
        )
    }
}
