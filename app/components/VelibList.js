import React, { Component } from 'react';
import { ListView, Text } from 'react-native';

import Station from './Station';
import ApiClient from './ApiClient';

const API_URL = 'http://opendata.paris.fr/api/records/1.0/search/?dataset=stations-velib-disponibilites-en-temps-reel&facet=banking&facet=bonus&facet=status&facet=contract_name';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class VelibList extends Component {
  constructor() {
    super();

    this.apiClient = new ApiClient();
    this.state = {
      velibList: ds.cloneWithRows([
        {
          fields: {
            name: "Station 1",
            position: [48.8589507, 2.2775172]
          }
        },
        {
          fields: {
            name: "Station 2",
            position: [48.8589507, 2.2775172]
          }
        }
      ]),
    };
  }

  componentDidMount() {
    this.apiClient.get(API_URL).then((res) => {
      console.log("Data received from api client", res);
      this.setState({velibList: ds.cloneWithRows(res.data.records)});
    });
  }

  render() {
      return (
        <ListView
          dataSource={this.state.velibList}
          renderRow={(record, sectionId, rowId) => {
            if (rowId % 2 === 0) {
              return <Station data={record} styles={{backgroundColor: '#f0f0f0'}} />
            } else {
              return <Station data={record} styles={{backgroundColor: '#e1e1e1'}} />
            }
          }}
        />
      );
  }
}
