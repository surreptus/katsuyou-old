import React, { ChangeEvent, useRef }from 'react'
import { Input } from '@chakra-ui/react'
import { toHiragana } from 'wanakana'

interface Props {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function KanaInput({ onChange, value, ...rest }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>)=> {
    inputRef.current!.value = toHiragana(event.target.value)
    onChange(event)
  }

  return (
    <Input
      {...rest}
      ref={inputRef}
      variant='flushed'
      onChange={handleChange}
      value={toHiragana(value)}
      fontSize='4xl'
      lang='jp'
    />
  )
}
