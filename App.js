import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import Header from './Components/Header'
import HeroModal from './Components/HeroModal';
import Repo from './Components/Repo';
import md5 from 'md5';
import Heroes from './Components/Heroes';


type Props = {};
export default class App extends Component<Props> {
  
  state = {
    heroes: [],
  }
  componentDidMount() {
    // const privateKey = '6ff5c79f8348872cc1e726a9442f99fe94281cbb';
    // const publicKey = '42781c78a838c70158dd3303848bb187';
    // const timeStamp = Math.round(Date.now() / 1000);
    // const hash = md5(timeStamp + privateKey + publicKey);
    // console.log('componentdidmount');
    
    
    // const url = `https://gateway.marvel.com:443/v1/public/characters?limit=20&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;
    
    // const a = fetch(url)
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(function(res) {
    //     this.setState({heroes: res});
    //     // this.setState({heroes: response.data.results});
    //   });
    this.fetchHeroes();
  }
  fetchHeroes = async (newRepoText) => {
    const privateKey = '6ff5c79f8348872cc1e726a9442f99fe94281cbb';
    const publicKey = '42781c78a838c70158dd3303848bb187';
    const timeStamp = Math.round(Date.now() / 1000);
    const hash = md5(timeStamp + privateKey + publicKey);
    
    
    const url = `https://gateway.marvel.com:443/v1/public/characters?limit=20&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;
    const repoCall = await fetch(url);
    const response = await repoCall.json()
       
    // console.log(response.data.results);
    this.setState({heroes: response.data.results});
    
    // const heroes = {
    //   id: response.data.results.id,
    //   title: response.data.results.name,
    //   author: response.data.results.description,
    //   // thumbnail: response.data.results.thumbnail.path + response.data.results.thumbnail.extension,
    // };
    // console.log(heroes);
    // this.setState({
    //   modalVisible: false,
    //   repos: [
    //     ...this.state.repos, heroes
    //   ]
    // })
  }

  state = {
    modalVisible: false,
    heroes: []
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Header headerText="Minicurso GoNative"/> */}

        <View style={styles.header}>
          <Text style={styles.headerText}>ReactNative</Text>
          <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
            <Text style={styles.headerButton}>+</Text>

          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.repoList}>
            { this.state.heroes === [] ? '' : this.state.heroes.map(hero => 
                <TouchableOpacity key={hero.id} onPress={() => {this.setState({modalVisible: true})}}>
                    <Heroes key={hero.id} description={hero.description} title={hero.name} image={hero.thumbnail.path + '.' + hero.thumbnail.extension} />
                </TouchableOpacity>
              ) 
            }
        </ScrollView>

        <HeroModal modalVisible={this.state.modalVisible}
          heroName={'testee'} 
          onCancel={() => {this.setState({modalVisible: false})}}
          onAdd={() => this.fetchHeroes}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  repoList: {
    padding: 20
  },
  header: {
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  headerButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
  }
});
