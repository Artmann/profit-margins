import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/home';

export default function App(): ReactElement {
  return (
    <div className="">
      <div className="container mx-auto max-w-5xl">

        <BrowserRouter>
          <Switch>

            <Route path="/" exact>
              <HomePage />
            </Route>

          </Switch>
        </BrowserRouter>

      </div>
    </div>
  );
}
