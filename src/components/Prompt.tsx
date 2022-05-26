import React, { useState } from 'react'
import { Button, Input } from '@chakra-ui/react'
import { Formik, FormikHelpers, Form, Field, FieldProps } from 'formik'
import { Inflection, Group, Question, Answer } from '../types'
import conjugate from '../utilities/conjugate'

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

  console.log(conjugate('derp', Inflection.Present, Group.Ichidan))

  const handleSubmit = ({ guess }: FormValues) => {
    const answer = onGuess(guess)
    setAnswer(answer)
  }

  const handleReset = (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    setAnswer(null)
    resetForm()
    onProceed()
  }

  return (
    <div>
      {question.verb}
      {question.sentence}

      <Formik
        onReset={handleReset}
        onSubmit={handleSubmit}
        initialValues={{
          guess: ''
        }}>
        {(form) => {
          const hasAnswered = form.status === 'answered'
          
          return (
            <Form>
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
                <Button type='reset'>
                  Reset
                </Button>
              )}

              {!hasAnswered  && (
                <Button type='submit'>
                  Submit
                </Button>
              )}
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
