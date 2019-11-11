 import React,{ Component, PureComponent } from 'react';
import  { Route, Switch, Redirect } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'

import * as action from './store/actions/auth';
import Layout from './hoc/Layout/Layout';
import KoljadiList from './containers/KoljadiList/KoljadiList';
import HomePage from './containers/HomePage/HomePage';
import Random from './containers/Random/Random';
import Auth from './containers/Auth/Auth';
import ResetPassword from './components/PasswordReset/PasswordReset';
// import Aux from './hoc/Aux';
class App extends Component{
  
  componentDidMount(){
  this.props.onCheckSingInState()

}
  render(){
    
    const authNav = (
      <Switch>
        <Route  path="/home" component={HomePage}/>
        <Route path="/koljadi" component={KoljadiList}/>
        <Route path="/random" component={Random}/>
        <Redirect from='*' to='/home'/>

     
      </Switch>);
      
    const unAuth = (        
      <Switch>
           <Route path="/auth" component={Auth}/>
           <Route path="/resetPassword" component={ResetPassword}/>
            <Redirect from='/' to='/auth'/>
      </Switch>
       
    );
      return (
          <Layout auth={this.props.auth}>
              {this.props.auth? authNav : unAuth}
          </Layout>
      );
  }
}

const mapStateToProps =  state => {
  return{
      auth: state.auth.idToken
  }
};

const mapDispatchToProps = dispatch => { 
  return{
    onCheckSingInState: () => dispatch(action.onCheckSingInState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
