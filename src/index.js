import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from 'registerServiceWorker';

import { Provider } from 'mobx-react';

import RootStore from 'stores/RootStore';

import App from 'containers/App';


const Root = (
    <Provider {...RootStore}>
        <App />
    </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));

registerServiceWorker();
