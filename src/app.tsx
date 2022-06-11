import React, { ReactElement } from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { ItemsProvider } from './data'
import { HomePage } from './pages/home'
import { ItemPage } from './pages/item'

export default function App(): ReactElement {
  return (
    <div className="text-gray-300">
      <div className="container mx-auto max-w-5xl">

        <ItemsProvider>

          <BrowserRouter>
            <Switch>

              <Route path="/" exact>
                <HomePage />
              </Route>

              <Route path="/items/:id" exact>
                <ItemPage />
              </Route>

            </Switch>
          </BrowserRouter>

        </ItemsProvider>

      </div>
    </div>
  )
}
