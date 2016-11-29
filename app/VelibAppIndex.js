import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity
} from 'react-native';
import Button from 'react-native-button';

import Map from './components/Map';
import VelibList from './components/VelibList';

export default class App extends Component {
    constructor() {
      super();
      this.state = {
        height: new Animated.Value(0.5),
        isMapExpanded: false,
        buttonSymbol: '+'
      };
    }

    _onPress() {
      if (this.state.isMapExpanded) {
        Animated.sequence([
          Animated.timing(this.state.height, {
            toValue: 0.5,
            duration: 800
          })
        ]).start(event => {
          if (event.finished) {
            this.state.isMapExpanded = !this.state.isMapExpanded;
          }
        });
        this.setState({buttonSymbol: '+'});
      } else {
        Animated.sequence([
          Animated.timing(this.state.height, {
            toValue: 1.5,
            duration: 600
          })
        ]).start(event => {
          if (event.finished) {
            this.state.isMapExpanded = !this.state.isMapExpanded;
          }
        });
        this.setState({buttonSymbol: '-'});
      }
    }

    componentDidMount() {
      // quand le composant est prêt
    }

    render() {
      return (
        <View style={styles.container}>
          <Animated.View style={StyleSheet.flatten([styles.mapContainer, {flex: this.state.height}])}>
            <Map/>
            <Button
              style={styles.expandBtn}
              onPress={this._onPress.bind(this)}>
              {this.state.buttonSymbol}
            </Button>
          </Animated.View>
          <Animated.View style={StyleSheet.flatten([styles.listContainer, {flex: 1}])}>
            <VelibList/>
          </Animated.View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF'
  },
  mapContainer: {
    borderWidth: 1,
    borderColor: '#d6d7da',
    alignItems:'flex-end',
    justifyContent:'flex-end'
  },
  listContainer: {
    flex: 0.5,
    backgroundColor: '#fff'
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandBtn: {
    height: 40,
    width: 40,
    fontSize: 30,
    color: '#000',
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});