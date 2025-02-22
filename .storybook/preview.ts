import type { Preview } from '@storybook/react'
import '../src/styles/index.scss'
import { withRouter } from 'storybook-addon-react-router-v6'
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}
export const decorators = [withRouter]
export default preview
