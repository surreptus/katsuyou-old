import { ChakraProvider } from '@chakra-ui/react'
import React from 'react';
import './App.css';

import Progress from './components/Progress'
import Prompt from './components/Prompt'
import Layout from './components/Layout'

function App() {
  const question = {
    verb: '食べる',
    sentence: '納豆を食べよう'
  }

  function handleGuess() {
    return {
      conjugation: 'test',
      translated: 'hello world'
    }
  }

  function handleProceed() {
  }

  return (
    <ChakraProvider>
      <Layout>
        <Progress />

        <Prompt question={question} onGuess={handleGuess} onProceed={handleProceed}/>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
