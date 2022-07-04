import React from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Stack,
  Button,
  Text
} from '@chakra-ui/react'
import { toHiragana  } from 'wanakana'
import { Formik, FormikHelpers, Form, Field } from 'formik'
import { Question } from '../types'
import Target from './Target'
import KanaInput from './KanaInput'

interface Props {
  lesson: Question;
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

export default function Prompt ({ lesson, onGuess, onNext }: Props) {
  const sentence = lesson.sentences[0]

  const handleSubmit = (
    { guess }: FormValues,
    { setStatus }: FormikHelpers<FormValues>
  ) => {
    setStatus('conjugationed')
    onGuess(guess)
  }

  return (
    <Formik
      enableReinitialize
      onSubmit={handleSubmit}
      initialValues={INITIAL_VALUES}
    >
      {({ values, status, handleReset }) => {
        const isCorrect = values.guess === toHiragana(lesson.conjugation)
        const hasAnswered = status === 'conjugationed'
        const derp = () => {
          handleReset()
          onNext()
        }

        return (
          <Form>
            <Stack py='12' alignItems='center'spacing='4' direction='column'>
              <Target value={lesson.inflection} />

              <Popover trigger='hover'>
                <PopoverTrigger>
                  <Stack justify='center' direction='row' flexWrap='wrap'>
                    {sentence.original.map(part => {
                      console.log('---------')
                      console.log(part.unlifted, part.lifted, lesson.conjugation)
                      return part.unlifted === lesson.conjugation
                        ? 
                          (
                            <Stack direction='row' key={part.unlifted} alignItems='center'>
                              <Field
                                color={hasAnswered
                                  ? isCorrect ? 'green' : 'red'
                                  : 'inherit'
                                }
                                autoFocus
                                width={lesson.conjugation.length * 36 + 'px'}
                                name='guess'
                                disabled={hasAnswered}
                                value={hasAnswered
                                  ? lesson.conjugation
                                  : values.guess
                                }
                                as={KanaInput}
                              /> 

                              <Text color='blue.500' fontSize='4xl' whiteSpace='nowrap'>
                                ({lesson.verb})
                              </Text>
                            </Stack>
                        )
                        : (
                          <Text key={part.unlifted} fontSize='4xl' whiteSpace='nowrap'>
                            {part.unlifted}
                          </Text>
                        )
                    })}
                  </Stack>
                </PopoverTrigger>

                <PopoverContent>
                  <PopoverHeader>{lesson.verb} - {lesson.meaning}</PopoverHeader>
                  <PopoverBody>{sentence.translation}</PopoverBody>
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
