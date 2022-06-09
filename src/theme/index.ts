import { extendTheme } from '@chakra-ui/react'

import textStyles from './text-styles'
import components from './components'

export default extendTheme({
  components,
  fonts: {
    english: 'Rubik, sans-serif',
    japanese: '"Kosugi Maru", sans-serif'
  },
  textStyles,
  styles: {
    global: {
      body: {
        fontFamily: 'english'
      }
    }
  }
})
