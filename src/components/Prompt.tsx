import React from 'react'
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, Stack, Button, Text } from '@chakra-ui/react'
import { Formik, FormikHelpers, Form, Field } from 'formik'
import { Question } from '../types'
import Target from './Target'
import KanaInput from './KanaInput'

interface Props {
  question: Question;
  onGuess: (guess: string) => void;
  onNext: () => void;
}

interface FormValues {
  guess: string;
}

const INITIAL_VALUES: FormValues = {
  guess: ''
}

// const sentence = {"english":"What do you think about having breakfast at McDonald's?","kanji":"マクドナルドで朝食を食べませんか。","kana":"マクドナルドでちょうしょくをたべませんか。","pieces":[{"lifted":"","unlifted":"マクドナルド"},{"lifted":"","unlifted":"で"},{"lifted":"ちょうしょく","unlifted":"朝食"},{"lifted":"","unlifted":"を"},{"lifted":"た","unlifted":"食べません"},{"lifted":"","unlifted":"か"}]}

export default function Prompt ({ question, onGuess, onNext }: Props) {
  const handleSubmit = (
    { guess }: FormValues,
    { setStatus }: FormikHelpers<FormValues>
  ) => {
    setStatus('answered')
    onGuess(guess)
  }

  return (
    <Formik
      enableReinitialize
      onSubmit={handleSubmit}
      initialValues={INITIAL_VALUES}
    >
      {({ values, status, handleReset }) => {
        const isCorrect = values.guess === question.answer
        const hasAnswered = status === 'answered'
        const derp = () => {
          handleReset()
          onNext()
        }

        return (
          <Form>
            <Stack py='12' alignItems='center'spacing='4' direction='column'>
              <Target value={question.target} />

              <Popover trigger='hover'>
                <PopoverTrigger>
                  <Stack justify='center' direction='row'>
                    {question.sentence.map(part => {
                      return part ===  question.answer
                        ? 
                          (
                            <Stack direction='row' key={part} alignItems='center'>
                              <Field
                                color={hasAnswered
                                  ? isCorrect ? 'green' : 'red'
                                  : 'inherit'
                                }
                                autoFocus
                                width={question.answer.length * 36 + 'px'}
                                name='guess'
                                disabled={hasAnswered}
                                value={hasAnswered
                                  ? question.answer
                                  : values.guess
                                }
                                as={KanaInput}
                              /> 

                              <Text color='blue.500' fontSize='4xl' whiteSpace='nowrap'>
                                ({question.verb})
                              </Text>
                            </Stack>
                        )
                        : (
                          <Text key={part} fontSize='4xl' whiteSpace='nowrap'>
                            {part}
                          </Text>
                        )
                    })}
                  </Stack>
                </PopoverTrigger>

                <PopoverContent>
                  <PopoverHeader>{question.verb} - {question.meaning}</PopoverHeader>
                  <PopoverBody>{question.translation}</PopoverBody>
                </PopoverContent>
              </Popover>

              {hasAnswered && (
                <Button onClick={derp}size='lg' type='reset'>
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
  )
}
