import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import SignUp from './pages/SignUp';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<SignUp component={App} />
	</React.StrictMode>
);
