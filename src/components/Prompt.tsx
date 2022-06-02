import React, { useState } from 'react'
import { Box, Heading, Stack, Button, Text } from '@chakra-ui/react'
import { Formik, FormikHelpers, Form, Field } from 'formik'
import { Question, Answer } from '../types'
import KanaInput from 'components/KanaInput'

interface Props {
  question: Question;
  onGuess: (guess: string) => Answer;
  onProceed: () => void;
}

interface FormValues {
  guess: string;
}

const INITIAL_VALUES: FormValues = {
  guess: ''
}

export default function Prompt ({ question, onGuess, onProceed }: Props) {
  const [answer, setAnswer] = useState<Answer | null>()

  const handleSubmit = (
    { guess }: FormValues,
    { setStatus }: FormikHelpers<FormValues>
  ) => {
    const answer = onGuess(guess)
    setStatus('answered')
    setAnswer(answer)
  }

  return (
    <div>
      <Box textAlign='center'>
        <Heading fontFamily='japanese' size='4xl'>
          {question.verb}
        </Heading>

        <Text>
          {question.sentence}
        </Text>
      </Box>

      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={INITIAL_VALUES}>
        {(form) => {
          const hasAnswered = form.status === 'answered'

          function handleReset () {
            form.handleReset()
            onProceed()
          }
          
          return (
            <Form>
              <Stack spacing='4' direction='row'>
                <Stack direction='row'>
                  {question.parts.map(part => {
                    return part ===  question.conjugated
                      ? 
                        <Field name='guess' as={KanaInput} /> 
                        : <Text fontSize='4xl' whiteSpace='nowrap'>{part}</Text>
                  })}
                </Stack>

                {hasAnswered && (
                  <Button size='lg' onClick={handleReset} type='reset'>
                    Next
                  </Button>
                )}

                {!hasAnswered  && (
                  <Button size='lg' type='submit'>
                    Submit
                  </Button>
                )}
              </Stack>
            </Form>
          )
        }}
    </Formik>

      {answer && (
        <Text fontSize='xl' pt='4' align='center'>
          {answer.conjugation}
          {answer.translated}
        </Text>
      )}
    </div>
  )
}
