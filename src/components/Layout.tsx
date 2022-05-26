import React from 'react'
import { Container } from '@chakra-ui/react'

interface Props {
  children: JSX.Element[]
}

export default function Layout ({ children }: Props) {
  return (
    <Container py='10'>
      {children}
    </Container>
  )
}
