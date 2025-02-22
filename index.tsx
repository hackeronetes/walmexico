import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import {store} from './store/store'

import './index.css'
import './datatable-responsive.css'

import App from './App'
import { ErrorBoundary } from "react-error-boundary";
import ErrorView from './ErrorView'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container!)

root.render(
  <Provider store={store}>
    <ErrorBoundary FallbackComponent={ErrorView}>
    <App />
    </ErrorBoundary>
  </Provider>
)
