import React, { useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Box, Heading, Stack, Button, Text } from '@chakra-ui/react'
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

const sentence = {"english":"What do you think about having breakfast at McDonald's?","kanji":"マクドナルドで朝食を食べませんか。","kana":"マクドナルドでちょうしょくをたべませんか。","pieces":[{"lifted":"","unlifted":"マクドナルド"},{"lifted":"","unlifted":"で"},{"lifted":"ちょうしょく","unlifted":"朝食"},{"lifted":"","unlifted":"を"},{"lifted":"た","unlifted":"食べません"},{"lifted":"","unlifted":"か"}]}

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
              <Stack py='12' alignItems='center'spacing='4' direction='column'>
                <Popover trigger='hover'>
                  <PopoverTrigger>
                    <Stack justify='center' direction='row'>
                      {question.example.parts.map(part => {
                        return part ===  question.verb.answer
                          ? 
                            (
                              <Stack direction='row' key={part} alignItems='center'>
                                <Field width={question.verb.answer.length * 36 + 'px'} name='guess' as={KanaInput} /> 

                                <Text color='blue.500' fontSize='4xl' whiteSpace='nowrap'>
                                  ({question.verb.japanese})
                                </Text>
                              </Stack>
                          )
                          : <Text key={part}fontSize='4xl' whiteSpace='nowrap'>{part}</Text>
                      })}
                    </Stack>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverHeader>{question.verb.japanese} - {question.verb.english}</PopoverHeader>
                    <PopoverBody>{question.example.english}</PopoverBody>
                  </PopoverContent>
                </Popover>

                {hasAnswered && (
                  <Button size='lg' onClick={handleReset} type='reset'>
                    Next
                  </Button>
                )}

                {!hasAnswered  && (
                  <Button colorScheme='green' size='lg' type='submit'>
                    Submit
                  </Button>
                )}
              </Stack>
            </Form>
          )
        }}
    </Formik>
    </div>
  )
}
