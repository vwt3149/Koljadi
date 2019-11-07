 import React,{ Component, PureComponent } from 'react';
import  { Route, Switch, Redirect } from 'react-router-dom';
import {withRouter} from 'react-router-dom'
import Layout from './hoc/Layout/Layout';
import KoljadiList from './containers/KoljadiList/KoljadiList';
import HomePage from './containers/HomePage/HomePage';
import Random from './containers/Random/Random';
import Auth from './containers/Auth/Auth';
// import Aux from './hoc/Aux';
class App extends Component{
  state = {
    auth: true
  }

  render(){
  
    const authNav = (
      <Switch>
        <Route path="/home" component={HomePage}/>
        <Route path="/koljadi" component={KoljadiList}/>
        <Route path="/random" component={Random}/>
        <Redirect from='/' to='/home'/>
      </Switch>);
      
    const unAuth = (        
      <Switch>
           <Route path="/auth" component={Auth}/>
          <Redirect  to='/auth'/>
      </Switch>
       
    );
      return (
          <Layout auth={this.state.auth}>
              {this.state.auth? authNav : unAuth}
          </Layout>
      );
  }
}

export default withRouter(App);
