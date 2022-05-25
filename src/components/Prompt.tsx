import React, { ChangeEvent, useState } from 'react'
import { Button, Input } from '@chakra-ui/react'
import { Question, Answer } from '../types'

interface Props {
  question: Question;
  onGuess: (guess: string) => Answer;
  onProceed: () => void;
}

export default function Prompt ({ question, onGuess, onProceed }: Props) {
  const [value, setValue] = useState('')
  const [answer, setAnswer] = useState<Answer | null>()

  const handleSubmit = () => {
    const answer = onGuess(value)
    setAnswer(answer)
  }

  const handleNext = () => {
    setAnswer(null)
    setValue('')
  }

  function handleChange (event: ChangeEvent<HTMLInputElement>) {
    return setValue(event.target.value)
  }

  const hasAnswered = Boolean(answer)

  return (
    <div>
      {question.verb}
      {question.sentence}

      <Input
        disabled={hasAnswered}
        type='text'
        value={value}
        onChange={handleChange}
        lang='jp'
      />

      {
        !hasAnswered && (
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        )
      }

      {
        hasAnswered && (
          <Button onClick={handleNext}>
            Next
          </Button>
        )
      }

      {answer && (
        <div>
          {answer.conjugation}
          {answer.translated}
        </div>
      )}
    </div>
  )
}
