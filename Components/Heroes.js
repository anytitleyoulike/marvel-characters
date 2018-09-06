import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import md5 from 'md5';
import HeroModal from './HeroModal';



export default class Heroes extends Component {
    
    componentDidMount() {
        // const privateKey = '6ff5c79f8348872cc1e726a9442f99fe94281cbb';
        // const publicKey = '42781c78a838c70158dd3303848bb187';
        // const timeStamp = Math.round(Date.now() / 1000);
        // const hash = md5(timeStamp + privateKey + publicKey);


        // const url = `https://gateway.marvel.com:443/v1/public/characters?limit=20&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;
        // const repoCall = fetch(url);
        // const response = repoCall.json()

        // // console.log(response.data.results);
        // this.setState({ heroes: response.data.results });
    }
    state = {
        modalVisible: false,

    }
    render() {
        return (
            <View>

                <View style={styles.repo}>
                    <Image
                        style={styles.heroImage}
                        source={{ uri: this.props.image }}
                    />

                    <View style={styles.heroInfo}>
                        <Text style={styles.heroTitle}>{this.props.title}</Text>
                        <Text style={styles.author} numberOfLines={3} ellipsizeMode="tail">{this.props.description}</Text>
                    </View>

                </View>
                <HeroModal modalVisible={this.state.modalVisible}
                    heroName={'testee'}
                    onCancel={() => { this.setState({ modalVisible: false }) }}
                    onAdd={() => this.fetchHeroes}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    repo: {
        padding: 20,
        backgroundColor: '#FFF',
        marginBottom: 20,
        borderRadius: 5,
        flexDirection: 'row'
    },
    heroImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    heroInfo: {
        marginHorizontal: 10,
        height: 70,
        width: 220,
        textAlign: 'justify',
    },
    heroTitle: {
        fontWeight: 'bold',
        color: '#333'
    },
    heroDescription: {
        fontSize: 13,
        color: '#999'
    }
})