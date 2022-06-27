import React from 'react'
import { Progress, Text } from '@chakra-ui/react'

interface Props {
  current: number;
  total: number;
}

export default function Stats({ current, total }: Props) {
  return (
    <div>
      <Progress value={(current / total) * 100} />
      <Text align='center'>
      {current} of {total}
      </Text>
    </div>
  )
}
