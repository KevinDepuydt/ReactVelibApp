import React, { Component } from 'react';
import {
    AsyncStorage
} from 'react-native';

const API_URL = 'http://opendata.paris.fr/api/records/1.0/search/?dataset=stations-velib-disponibilites-en-temps-reel&facet=banking&facet=bonus&facet=status&facet=contract_name';

export default class ApiClient {
    constructor() {
        this.cache = AsyncStorage
    }

    async get(url) {
        const key = encodeURIComponent(url);
        try {
            let value = await this.cache.getItem(key);
            if (value !== null) {
                return Promise.resolve({data: JSON.parse(value), from: 'Cache'});
            } else {
                return fetch(url)
                    .then(response => response.json())
                    .then((json) => {
                        this.cache.setItem(key, JSON.stringify(json));
                        return {data: json, from: 'API'};
                    })
                    ;
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    clearCache() {
        AsyncStorage.clear();
    }
}