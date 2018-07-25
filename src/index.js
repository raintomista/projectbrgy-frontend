import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import registerServiceWorker from 'registerServiceWorker';
import { Provider } from 'mobx-react';
import UserStore from './stores/UserStore';

const Root = (
    <Provider UserStore={UserStore}>
        <App />
    </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));

registerServiceWorker();
