import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import registerServiceWorker from 'registerServiceWorker';
import { Provider } from 'mobx-react';
import AppData from './stores/AppData';

const Root = (
    <Provider AppData={AppData}>
        <App />
    </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));

registerServiceWorker();
