import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions
} from 'react-native'
import { useState, useEffect } from 'react'
import Title from '../components/ui/Title'
import PrimaryButton from '../components/ui/PrimaryButton'
import NumberContainer from '../components/game/NumberContainer'
import Card from '../components/ui/Card'
import InstructionText from '../components/ui/InstructionText'
import { Ionicons } from '@expo/vector-icons'
import GuessLogItem from '../components/game/GuessLogItem'

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

const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [guessRounds, setGuessRounds] = useState([initialGuess])

  const { width, height } = useWindowDimensions()

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(guessRounds.length)
    }
  }, [currentGuess, userChoice, onGameOver])

  useEffect(() => {
    minBoundary = 1
    maxBoundary = 100
  }, [])

  function nextGuessHandler(direction) {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ])
      return
    }
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
    setCurrentGuess(nextRndNumber)
    setGuessRounds((currentRounds) => [nextRndNumber, ...currentRounds])
  }

  const guessRoundsListLength = guessRounds.length

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name='remove' size={24} color='white' />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name='add' size={24} color='white' />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  )

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name='remove' size={24} color='white' />
            </PrimaryButton>
          </View>

          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name='add' size={24} color='white' />
            </PrimaryButton>
          </View>
        </View>
      </>
    )
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={{ alignItems: 'center' }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    marginTop: 20
  },
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1
  },
  instructionText: {
    marginBottom: 16
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 16
  },
  listContainer: {
    flex: 1,
    padding: 16
  }
})

export default GameScreen
