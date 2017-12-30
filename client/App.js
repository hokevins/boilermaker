import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Root from './components/Root';

/*
In your browser JavaScript, you can import './path/to/index.css' into a JavaScript file - webpack will then include it in the build path. However, because we've told webpack to build any files ending with .css using the style-related loaders, it will transform our css files into a file that it loads directly onto the DOM from our bundle.js.
Recommend to import into the same entry point for webpack's JavaScript.
*/
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('app') // make sure this is the same as the id of the div in your index.html
);
