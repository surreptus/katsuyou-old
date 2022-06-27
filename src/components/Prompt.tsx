import React from 'react'
import { Badge, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, Stack, Button, Text } from '@chakra-ui/react'
import { Formik, FormikHelpers, Form, Field } from 'formik'
import { Question } from '../types'
import KanaInput from 'components/KanaInput'

interface Props {
  question: Question;
  onGuess: (guess: string) => void;
  onProceed: () => void;
}

interface FormValues {
  guess: string;
}

const INITIAL_VALUES: FormValues = {
  guess: ''
}

// const sentence = {"english":"What do you think about having breakfast at McDonald's?","kanji":"マクドナルドで朝食を食べませんか。","kana":"マクドナルドでちょうしょくをたべませんか。","pieces":[{"lifted":"","unlifted":"マクドナルド"},{"lifted":"","unlifted":"で"},{"lifted":"ちょうしょく","unlifted":"朝食"},{"lifted":"","unlifted":"を"},{"lifted":"た","unlifted":"食べません"},{"lifted":"","unlifted":"か"}]}

export default function Prompt ({ question, onGuess, onProceed }: Props) {
  const handleSubmit = (
    { guess }: FormValues,
    { setStatus, resetForm }: FormikHelpers<FormValues>
  ) => {
    onGuess(guess)
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
                <Stack direction='row' spacing='4'>
                  <Badge size='lg'>{question.target.sentiment}</Badge>

                  <Badge size='lg'>{question.target.inflection}</Badge>

                  <Badge size='lg'>{question.target.formality}</Badge>
                </Stack>

                <Popover trigger='hover'>
                  <PopoverTrigger>
                    <Stack justify='center' direction='row'>
                      {question.sentence.map(part => {
                        return part ===  question.answer
                          ? 
                            (
                              <Stack direction='row' key={part} alignItems='center'>
                                <Field autoFocus width={question.answer.length * 36 + 'px'} name='guess' as={KanaInput} /> 

                                <Text color='blue.500' fontSize='4xl' whiteSpace='nowrap'>
                                  ({question.verb})
                                </Text>
                              </Stack>
                          )
                          : <Text key={part}fontSize='4xl' whiteSpace='nowrap'>{part}</Text>
                      })}
                    </Stack>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverHeader>{question.verb} - {question.meaning}</PopoverHeader>
                    <PopoverBody>{question.translation}</PopoverBody>
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
