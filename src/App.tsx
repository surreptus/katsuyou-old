import { ChakraProvider } from '@chakra-ui/react'
import React, { useState }from 'react';
import './App.css';
import conjugate from 'utilities/conjugate'
import lessons from 'lessons.json'
import theme from 'theme'

import Progress from './components/Progress'
import Prompt from './components/Prompt'
import Layout from './components/Layout'

const fake = [
  {
    sentence: 'りんごをたべます',
    verb: '食べる',
    parts: ['りんご', 'を', '食べます'],
    inflection: {
      tense: 'past',
      formality: 'polite'
    },
    conjugated: '食べます',
    group: 'ichidan'
  }
]

function App() {
  const [current, setCurrent] = useState(0)
  const question = fake[current]

  const handleGuess = () => {
    return {
      conjugation: conjugate(question.verb, 'present', question.group),
      translated: 'hello world'
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Progress />

        <Prompt
          question={question}
          onGuess={handleGuess}
          onProceed={() => setCurrent(current + 1)}
        />
      </Layout>
    </ChakraProvider>
  );
}

export default App;