import { extendTheme } from '@chakra-ui/react'

import textStyles from './text-styles'

export default extendTheme({
  fonts: {
    english: 'Rubik, sans-serif',
    japanese: '"Kosugi Maru", sans-serif'
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: 400
      }
    }
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
