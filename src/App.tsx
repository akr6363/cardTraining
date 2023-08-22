import { Provider } from 'react-redux'

import 'react-toastify/dist/ReactToastify.css'
import { Router } from '@/router.tsx'
import { store } from '@/services/store.ts'

export function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}
