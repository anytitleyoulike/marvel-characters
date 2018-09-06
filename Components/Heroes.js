import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import md5 from 'md5';
import HeroModal from './HeroModal';



export default class Heroes extends Component {
    
    componentDidMount() {
        this.fetchHeroes();
    }
    state = {
        modalVisible: false,
        heroes: []
    }


    fetchHeroes = async () => {
        const privateKey = '6ff5c79f8348872cc1e726a9442f99fe94281cbb';
        const publicKey = '42781c78a838c70158dd3303848bb187';
        const timeStamp = Math.round(Date.now() / 1000);
        const hash = md5(timeStamp + privateKey + publicKey);


        const url = `https://gateway.marvel.com:443/v1/public/characters?&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;
        const heroesCall = await fetch(url);
        const response = await heroesCall.json()

        console.log(response.data.results);
        this.setState({ heroes: response.data.results });

    }


    render() {
        return (
            <View>
                <ScrollView style={styles.heroesList}>

                
                <FlatList
                    data={this.state.heroes}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity key={item.id} onPress={() => { this.setState({ modalVisible: true }) }}>
                                <View style={styles.box}>
                                    <Image
                                        style={styles.heroImage}
                                        source={{ uri: item.thumbnail.path + '.' + item.thumbnail.extension }}
                                    />

                                    <View style={styles.heroInfo}>
                                        <Text style={styles.heroTitle}>{item.name}</Text>
                                        <Text style={styles.author} numberOfLines={3} ellipsizeMode="tail">{item.description || "Character have no descripiton"}</Text>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                </ScrollView>
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
    box: {
        padding: 20,
        backgroundColor: '#FFF',
        marginBottom: 20,
        borderRadius: 5,
        flexDirection: 'row'
    },
    heroesList: {
        padding: 20
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
        fontSize: 14,
        color: '#999'
    }
})