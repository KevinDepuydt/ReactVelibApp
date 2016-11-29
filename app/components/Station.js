import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class Station extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={StyleSheet.flatten([styles.stationContainer, this.props.styles])}>
              <View style={styles.nameView}>
                <Text style={styles.name}>{this.props.data.fields.name}</Text>
                <Text style={styles.coordinate}>[{this.props.data.fields.position[0]}, {this.props.data.fields.position[1]}]</Text>
              </View>
              <View style={styles.numberView}>
                <Text style={styles.availability}>{this.props.data.fields.available_bikes}/{this.props.data.fields.bike_stands}</Text>
              </View>
            </View>
        );
    }
}

Station.propTypes = {
    data: React.PropTypes.object.isRequired,
    styles: React.PropTypes.object
};

Station.defaultProps = {
    data: {},
    styles: {}
};

const styles = StyleSheet.create({
  stationContainer: {
    height: 70,
    padding: 10,
    flexDirection: 'row',
    flex: 1,
  },
  nameView: {
    flex: 0.7,
    alignItems: 'flex-start'
  },
  numberView: {
    flex: 0.3,
    alignItems: 'flex-end'
  },
  name: {
    fontSize: 15,
    color: '#232323',
  },
  coordinate: {
    fontSize: 12,
    color: '#0d4393',
  },
  availability: {
    fontSize: 15,
    color: '#1b9302',
  }
});