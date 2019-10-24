import React from 'react';
import  { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import KoljadiList from './containers/KoljadiList/KoljadiList';
import HomePage from './containers/HomePage/HomePage';
import Random from './containers/Random/Random';
function App() {
  return (
    
      <Layout>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route path="/koljadi" component={KoljadiList}/>
          <Route path="/random" component={Random}/>
          <Redirect from="/" to="/home"/>
        </Switch>
      </Layout>
  );
}

export default App;
