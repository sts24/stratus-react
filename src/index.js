import React from "react";
import ReactDOM from 'react-dom';
import { render } from 'react-snapshot';

import App from './App';
import { StoreProvider } from './Store';

import './scss/styles.scss';

ReactDOM.render(
	render(
		<StoreProvider>
			<App />
		</StoreProvider>,
		document.getElementById("root")
	)
);