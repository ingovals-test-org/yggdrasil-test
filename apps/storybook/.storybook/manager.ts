import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

const yourTheme = create({
  base: 'light',
  brandTitle: 'Hönnunarbók',
})

addons.setConfig({
  theme: yourTheme,
})
