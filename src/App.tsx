import { ChakraProvider, Box, Heading, Text } from '@chakra-ui/react'
import React, { useState }from 'react';
import './App.css';
import lessons from 'lessons.json'
import theme from 'theme'

import Progress from './components/Progress'
import Prompt from './components/Prompt'
import Layout from './components/Layout'

const test = lessons.slice(0,10)

function App() {
  const [current, setCurrent] = useState(0)
  const [complete, setComplete] = useState(false)
  const lesson = test[current]
  const total = test.length

  const handleGuess = () => {
  }

  const handleNext = () => {
    const next = current + 1

    setCurrent(next)
    if (next === test.length) {
      return setComplete(true)
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Progress total={total} current={current} />

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
                lesson={lesson}
                onGuess={handleGuess}
                onNext={handleNext}
              />
            )
          }
        </>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
