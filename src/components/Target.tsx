import React from 'react'
import { Stack, Badge } from '@chakra-ui/react'
import { Question } from '../types'

interface Props {
  value: Question["inflection"]
}

export default function Target ({ value }: Props) {
  return (
    <Stack direction='row' spacing='4'>
      <Badge size='lg'>{value.tense}</Badge>

      <Badge size='lg'>{value.mood}</Badge>

      <Badge size='lg'>{value.formality}</Badge>
    </Stack>
  )
}
