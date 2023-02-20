import logo from './logo.svg';
import './App.css';
import { config } from './Config';
import { PublicClientApplication } from '@azure/msal-browser';
import React from 'react';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      error:null,
      isAuthenticated:false,
      user:{}
    };

    this.login = this.login.bind(this);

    this.publicClientApplication = new PublicClientApplication({
      auth:{
        clientId:config.appId,
        redirectUri:config.redirectUrl,
        authority:config.authority
      },
      cache:{
        cacheLocation:"sessionsStorage",
        storeAuthStateInCookie:true
      }
    })
  }; 

  async login(){
    try{
      await this.publicClientApplication.loginPopup({
        scopes:config.scopes,
        prompt:"select_account"
      });
      this.setState({isAuthenticated:true})

    }catch(err){
      this.setState({isAuthenticated:false,user:{},error:err})

    }
  }
  logout(){
    this.publicClientApplication.logout();
  }
  render(){
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>test</p>
            {this.state.isAuthenticated ? <p>login success</p> : <button onClick={()=> this.login()}>Login</button>}
          </header>
        </div>
      );
  }
}
export default App;
