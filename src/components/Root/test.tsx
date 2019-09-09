import React from 'react';
import ReactDOM from 'react-dom';
import Root from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Root initialConsoleEntries={[]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
