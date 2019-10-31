import React,{ Component } from 'react';
import  { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import KoljadiList from './containers/KoljadiList/KoljadiList';
import HomePage from './containers/HomePage/HomePage';
import Random from './containers/Random/Random';
import Auth from './containers/Auth/Auth'
class App extends Component{
  state = {
    auth: false
  }
  render(){
    const authNav = (
      <Switch>
        <Route path="/home" component={HomePage}/>
        <Route path="/koljadi" component={KoljadiList}/>
        <Route path="/random" component={Random}/>
        <Redirect from="/" to="/home"/>
      </Switch>);
    const unAuth = (
      <Route path="/" component={Auth}/>
    );
      return (
          <Layout>
            
              {this.state.auth? authNav : unAuth}
          </Layout>
      );
  }
}

export default App;
