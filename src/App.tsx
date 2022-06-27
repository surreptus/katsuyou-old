import { ChakraProvider, Box, Heading, Text } from '@chakra-ui/react'
import React, { useState }from 'react';
import './App.css';
import lessons from 'lessons.json'
import theme from 'theme'

import Progress from './components/Progress'
import Prompt from './components/Prompt'
import Layout from './components/Layout'

const fake = [
  {
    group: 'ichidan',
    verb: '食べる',
    meaning: 'to eat',
    sentence: ['りんご', 'を', '食べます'],
    translation: 'I eat an apple',
    answer: '食べます',
    target: {
      sentiment: 'positive',
      inflection: 'volitional',
      formality: 'polite'
    }
  },
  {
    group: 'ichidan',
    verb: '見る',
    meaning: 'to see',
    sentence: ['映画', 'を', 'みる'],
    translation: 'I watch movies',
    answer: 'みる',
    target: {
      sentiment: 'positive',
      inflection: 'present',
      formality: 'plain'
    }
  }
]

function App() {
  const [current, setCurrent] = useState(0)
  const [complete, setComplete] = useState(false)
  const question = fake[current]
  const total = fake.length

  const handleGuess = () => {
  }

  const handleNext = () => {
    const next = current + 1

    console.info(next, fake.length)

    if (next === fake.length) {
      return setComplete(true)
    }

    return setCurrent(next)
  }

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Progress total={total} current={current + 1} />

        <>
          {
            complete && (
              <Box textAlign='center'>
                <Heading>
                  You're done!
                </Heading>
                <Text>
                  You've answered all the questions. Restart for the next round.
                </Text>
              </Box>
            )
          }

          {
            !complete && (
              <Prompt
                question={question}
                onGuess={handleGuess}
                onProceed={handleNext}
              />
            )
          }
        </>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
