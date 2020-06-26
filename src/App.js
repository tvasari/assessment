import React, { Component } from 'react';
import validator from 'validator';
import 'animate.css';
import './App.css';

import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
import Navigation from './components/Navigation/Navigation.js';
import ContentList from './components/ContentList/ContentList.js';


class App extends Component {

  constructor() {
    super();
    this.state = {
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: ''
      },
      content: {
        tipo: '',
        contenuto: ''
      },
      input: ''
    };
    this.logout = this.logout.bind(this);
    this.resetTimeout = this.resetTimeout.bind(this);
  }

  componentDidMount() {
    this.loadContent();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.route !== prevState.route && this.state.route === 'home') {
      this.events = ['load', 'mousemove', 'mousedown',
      'click', 'scroll', 'keypress'];
      this.events.forEach((event) => {
        window.addEventListener(event, this.resetTimeout);
      });
      
      this.setTimeout();
    }
  }

  loadUser = (data) => {
    this.setState({user :{
        id: data.id,
        name: data.name,
        email: data.email
      }})
  }

  onRouteChange = (route) => {
    this.setState({route: route});

    if (route === 'signout') {
      this.setState({route: 'signin', isSignedIn: false});
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
  }

  clearTimeout() {
    if(this.warnTimeout)
      clearTimeout(this.warnTimeout);

    if(this.logoutTimeout)
      clearTimeout(this.logoutTimeout);
  }

  setTimeout() {
    this.warnTimeout = setTimeout(() => alert('logout in 1 minuto.'), 8 * 30 * 1000)
    this.logoutTimeout = setTimeout(this.logout, 10 * 30 * 1000);
  }

  resetTimeout() {
    this.clearTimeout();
    this.setTimeout();
  }

  logout() {
    this.setState({route: 'signin', isSignedIn: false});
    this.destroy();
  }

  destroy() {
    this.clearTimeout();

    this.events.forEach((event) => {
      window.removeEventListener(event, this.resetTimeout);
    });
  }

  loadContent() {
    fetch('https://morning-castle-assessment-api.herokuapp.com/content')
      .then(response => response.json())
      .then(data => {
          const contentArr = [];
          data.forEach(content => {
            if (content.is_approved === '1') { 
              contentArr.push({
                tipo: content.tipo,
                contenuto: content.contenuto
              })
            }
          });
          console.log('contentarr', contentArr)
          this.setState({ content: contentArr })
      })
      .catch(err => console.log(err))
  }

  uploadContent() {
    let dataType;
    validator.isURL(this.state.input)
    ? dataType = 'immagine'
    : dataType = 'testo'

    fetch('https://morning-castle-assessment-api.herokuapp.com/postcontent', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            tipo: dataType,
            contenuto: this.state.input
        })
    })
    .then(response => response.json())
    .then(data => this.loadContent())
    let popup = document.getElementById('popup');
    popup.style.visibility = 'visible';
    popup.className = 'my-animation';
    setTimeout(() => {popup.style.visibility = 'hidden'}, 3000);
  }

  renderSwitch() {
    const { route, content } = this.state;

    switch(true) {
      case route === 'home':
        return <div>
                  <h1>Posta qui il tuo contenuto</h1>
                  <ContentList content={content}/>
                </div>
      case route === 'signin' || route === 'signout':
        return <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      case route === 'register':
        return <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      case route === 'upload':
        return <div>
                    <h3>Inserisci un testo o l'URL di un'immagine da pubblicare</h3>
                    <div>
                        <input type='text' onChange={(event) => this.setState({input: event.target.value})}></input>
                        <a className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-purple" href="#0" onClick={() => this.uploadContent()}>Upload</a>
                    </div>
                    <h1 id='popup' className=''>Grazie, adesso attendi che il tuo contenuto sia approvato per la pubblicazione.</h1>
                </div>
      default:
        return <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
    }
  }

  render() {
    const { isSignedIn } = this.state;
    
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}  />
        { 
          this.renderSwitch()
        }
      </div>
    );
  }
}

export default App;
