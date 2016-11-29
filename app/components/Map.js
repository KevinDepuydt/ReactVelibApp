import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import ApiClient from './ApiClient';

const API_URL = 'http://opendata.paris.fr/api/records/1.0/search/?dataset=stations-velib-disponibilites-en-temps-reel&facet=banking&facet=bonus&facet=status&facet=contract_name';

export default class Map extends Component {
  constructor() {
    super();

    this.apiClient = new ApiClient();
    this.state = {
      region: {
        latitude: 37.785834,
        longitude: -122.406417,
        latitudeDelta: 0.0300,
        longitudeDelta: 0.0300,
      },
      currentPos: {
        color: '#FF7D00',
        radius: 50,
        latlng: {
          latitude: 37.785834,
          longitude: -122.406417
        }
      },
      markers: []
    };

    this.watchID = null;
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setMapPosition(position);
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      console.log("Last position : " + JSON.stringify(position));
    });

    this.apiClient.get(API_URL).then((res) => {
      let markers = [];
      res.data.records.forEach(function(record) {
        markers.push({
          coordinate: {
            latitude: record.fields.position[0],
            longitude: record.fields.position[1]
          },
          title: record.fields.name,
          description: record.fields.available_bikes + '/' + record.fields.bike_stands + ' Vélos disponibles à cette station'
        });
      });
      this.setState({ markers });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  setMapPosition(position) {
    let region = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.0300,
      longitudeDelta: 0.0300,
    };
    let currentPos = {
      color: '#FF7D00',
      radius: 50,
      latlng: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    };

    this.setState({region, currentPos});
  }

  render() {
    return (
      <View style ={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={this.state.region}
        >
          <MapView.Circle
            center={this.state.currentPos.latlng}
            radius={15}
            fillColor="#FF7D00"
            strokeColor="#FF7D00"
          />
          {this.state.markers.map((marker, key) => (
            <MapView.Marker
              key={key}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});