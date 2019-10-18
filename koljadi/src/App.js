import React from 'react';
import  { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import KoljadiList from './containers/KoljadiList/KoljadiList';
import HomePage from './containers/HomePage/HomePage';
function App() {
  return (
    
      <Layout>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route path="/koljadi" component={KoljadiList}/>
          <Redirect from="/" to="/home"/>
        </Switch>
      </Layout>
  );
}

export default App;
