import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native'
import StartGameScreen from './screens/StartGameScreen'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts } from 'expo-font'
import { useState } from 'react'
import GameScreen from './screens/GameScreen'
import Colors from './constants/colors'
import GameOverScreen from './screens/GameOverScreen'
import AppLoading from 'expo-app-loading'

export default function App() {
  const [userNumber, setUserNumber] = useState()
  const [gamIsOver, setGamIsOver] = useState(true)
  const [guessRounds, setGuessRounds] = useState(0)

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if (!fontsLoaded) {
    ;<AppLoading />
  }

  function onPickHandler(selectedNumber) {
    setUserNumber(selectedNumber)
    setGamIsOver(false)
  }

  function gameOverHandler(numberOfRounds) {
    setGamIsOver(true)
    setGuessRounds(numberOfRounds)
  }

  function onStartNewGame() {
    setUserNumber(null)
    // setGamIsOver(true) Already being done in gameOverHandler function
    setGuessRounds(0)
  }

  let screen = <StartGameScreen onPickNumber={onPickHandler} />

  if (userNumber) {
    screen = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  }

  if (gamIsOver && userNumber) {
    screen = (
      <GameOverScreen
        roundsNumber={userNumber}
        userNumber={guessRounds}
        onStartNewGame={onStartNewGame}
      />
    )
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode='cover'
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.15
  }
})
