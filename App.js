import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FontAwesom from 'react-native-vector-icons/FontAwesome';
import * as Speech from 'expo-speech'
import { Audio } from 'expo-av';

const App = () => {

  const [Joke, setJoke] = useState('Loading Joke....')
  const [isLoading, setLoading] = useState(false)

  const fetchJoke = () => {
    setLoading(true)
    fetch("https://indian-jokes-api.herokuapp.com/jokes/random")
      .then(response => response.json())
      .then(result => {
        setJoke(result.text)
        setLoading(false)
        soundPlay();
      })
  }
  useEffect(() => {
    fetchJoke()
  },[])

  const speakNow = async () => {
    const say = `${Joke}`
    Speech.speak(say)
  }

  const soundPlay = () => {
    const sound = new Audio.Sound()
    sound.loadAsync({uri: 'https://www.myinstants.com/media/sounds/oh-no-no-no-no-laugh.mp3'}, {shouldPlay: true})
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content'/>
      <Text style={styles.title}>Santa Ke Jokes</Text>
      <Image source={{ uri:'https://w7.pngwing.com/pngs/40/231/png-transparent-santa-claus-laughter-christmas-laughing-santa-claus-face-hat-holidays.png' }} style={styles.img}/>
      <View style={styles.modal}>
          <Text>{Joke}</Text>
          <TouchableOpacity style={{padding: 20,borderRadius: 30,marginVertical: 20,backgroundColor: isLoading? 'rgba(83, 114, 240, 1)' : 'rgba(83, 114, 240, 0.7)'}} onPress={fetchJoke}>
                    <Text style={styles.getQuote}>{isLoading ? "Loading..." : "New Quote"}</Text>
          </TouchableOpacity>
          <View style={{flexDirection: "row", justifyContent:"space-around"}}>
                    <TouchableOpacity onPress={speakNow} style={styles.circle}>
                        <FontAwesom name="volume-up" size={22} color="#5372F0"/>
                    </TouchableOpacity>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5372F0',
    alignItems: 'center',
    marginTop: 40
  },
  title: {
    fontSize: 40
  },
  modal:{
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginTop: 100
 },
 circle : {
  borderWidth: 2,
  borderColor: '#5372F0',
  borderRadius: 50,
  padding: 15
},
  img:{
    height: 100,
    width: 100,
    backgroundColor: '#fff'
  }
});

export default App;