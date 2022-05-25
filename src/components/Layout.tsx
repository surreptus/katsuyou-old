import React from 'react'

interface Props {
  children: JSX.Element[]
}

export default function Layout ({ children }: Props) {
  return (
    <div>
      {children}
    </div>
  )
}
