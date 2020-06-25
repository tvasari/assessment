import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
	if (isSignedIn) {
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('upload')} className='f4 link dim black underline pa1 pointer'>Posta contenuto</p>
				<p onClick={() => onRouteChange('home')} className='f4 link dim black underline pa1 pointer'>Home</p>
				<p onClick={() => onRouteChange('signout')} className='f4 link dim black underline pa1 pointer'>Esci</p>
			</nav>
		);
	} else {
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signin')} className='f4 link dim black underline pa1 pointer'>
					Accedi
				</p>
				<p onClick={() => onRouteChange('register')} className='f4 link dim black underline pa1 pointer'>
					Registrati
				</p>
			</nav>
		);
	}
}

export default Navigation;
