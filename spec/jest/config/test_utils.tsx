import React from 'react'
import {
  render as rtlRender,
  RenderOptions,
  RenderResult
} from '@testing-library/react'
import {
  MuiThemeProvider,
  CssBaseline,
  StylesProvider
} from '@material-ui/core'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { theme } from 'src/styles'
import { GenerateId } from 'jss'
import { rootReducer } from 'src/store'
import { createMemoryHistory } from 'history'
import { PlacesState } from 'src/store/places'

interface Options {
  initialState?: {
    places?: PlacesState
  }
  route?: string
  rtlOptions?: RenderOptions
}

const render = (ui: React.ReactElement, options?: Options): RenderResult => {
  let store = createStore(rootReducer)
  const route = '/'
  let history = createMemoryHistory({
    initialEntries: [route]
  })
  let rest = {}

  if (options) {
    const {
      initialState: initialStateOptions,
      route: routeOptions,
      ...rtlOptions
    } = options

    if (initialStateOptions) {
      store = createStore(rootReducer, initialStateOptions)
    }
    if (routeOptions) {
      history = createMemoryHistory({
        initialEntries: [routeOptions]
      })
    }

    rest = rtlOptions
  }

  const generateClassName: GenerateId = (rule, styleSheet) =>
    `${styleSheet?.options.classNamePrefix}-${rule.key}`
  const Wrapper: React.FC = ({ children }) => (
    <Provider store={store}>
      <Router history={history}>
        <StylesProvider generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </MuiThemeProvider>
        </StylesProvider>
      </Router>
    </Provider>
  )

  return rtlRender(ui, { wrapper: Wrapper, ...rest })
}

export * from '@testing-library/react'

export { render }
