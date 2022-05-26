import React, { useState } from 'react'
import { Stack, Button, Input } from '@chakra-ui/react'
import { Formik, FormikHelpers, Form, Field, FieldProps } from 'formik'
import { Question, Answer } from '../types'

interface Props {
  question: Question;
  onGuess: (guess: string) => Answer;
  onProceed: () => void;
}

interface FormValues {
  guess: string;
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
      {question.verb}
      {question.sentence}

      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={{
          guess: ''
        }}>
        {(form) => {
          const hasAnswered = form.status === 'answered'

          function handleReset () {
            form.handleReset()
            onProceed()
          }
          
          return (
            <Form>
              <Stack spacing='4' direction='row'>
                <Field name='guess'>
                  {({ field, form }: FieldProps<string>) => (
                    <Input
                      {...field}
                      bg={hasAnswered ? 'green' : 'transparent'}
                      disabled={hasAnswered}
                      lang='jp'
                    />
                  )}
                </Field>

                {hasAnswered && (
                  <Button onClick={handleReset} type='reset'>
                    Next
                  </Button>
                )}

                {!hasAnswered  && (
                  <Button type='submit'>
                    Submit
                  </Button>
                )}
              </Stack>
            </Form>
          )
        }}
      
    </Formik>

      {answer && (
        <div>
          {answer.conjugation}
          {answer.translated}
        </div>
      )}
    </div>
  )
}
