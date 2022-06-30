import React from 'react'
import { Stack, Badge } from '@chakra-ui/react'
import { Question } from '../types'

interface Props {
  value: Question["target"]
}

export default function Target ({ value }: Props) {
  return (
    <Stack direction='row' spacing='4'>
      <Badge size='lg'>{value.sentiment}</Badge>

      <Badge size='lg'>{value.inflection}</Badge>

      <Badge size='lg'>{value.formality}</Badge>
    </Stack>
  )
}
