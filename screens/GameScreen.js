import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react'
import Title from '../components/ui/Title'
import PrimaryButton from '../components/ui/PrimaryButton'
import NumberContainer from '../components/game/NumberContainer'

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum
  }
}

let minBoundary = 1
let maxBoundary = 100

const GameScreen = ({ userChoice }) => {
  const initialGuess = generateRandomBetween(
    minBoundary,
    maxBoundary,
    userChoice
  )
  const [currentGuess, setCurrentGuess] = useState(initialGuess)

  function nextGuessHandler(direction) {
    if (direction === 'lower') {
      maxBoundary = currentGuess
    } else {
      minBoundary = currentGuess + 1
    }
    const nextRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    )
    setCurrentGuess(nextNumber)
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or Lower?</Text>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
            -
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
            +
          </PrimaryButton>
        </View>
      </View>
      {/* <View>LOG ROUNDS</View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
})

export default GameScreen
