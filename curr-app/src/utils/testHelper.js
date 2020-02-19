import React from 'react';
import { render } from '@testing-library/react';
import { Router, Route } from 'react-router-dom'
import { createMemoryHistory } from 'history';

// Helper function
export function renderWithRouterMatch(
    UI,
    {
      path = "/",
      route = "/",
      history = createMemoryHistory({ initialEntries: [route] })
    } = {},
    props = {}
  ) {
    return {
      ...render(
        <Router history={history}>
          <Route 
            path={path} 
            render={(routeProps) => (
                <UI {...routeProps} {...props}/>
            )}
            />
        </Router>
      )
    };
  }