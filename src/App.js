import React from 'react';
import '../public/favicon.ico'
import './App.css';
import { BrowserRouter, Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { PrivateRoute } from './components';
import Header from './components/Header/index'
import Sidebar from './components/Sidebar/index'
import { MainBlog, MyBlog, Home, Login, Signup, CreatePost, Post } from './containers';
import { AuthProvider, VideoProvider } from './context/';


const HomeScreen = ({url}) => {
  let match = useRouteMatch();
  return(
    <>
      <Header />
      <Sidebar />
      <div className="mainframe">
        <Switch>
          <Route path={match.url} exact component={Home} />
            <VideoProvider>
              <Route path={`${match.url}/blog`} component={MainBlog} />
              <Route path={`${match.url}/myblog`} component={MyBlog} />
              <Route path={`${match.url}/create`} component={CreatePost} />
              <Route exact path={`${match.url}/post/:id`} component={Post} />
            </VideoProvider>
        </Switch>
      </div>
    </>
  )
}

const App = ({history}) => {
  return (
    <AuthProvider>
      <BrowserRouter history={history}>
        <div className="wrap"> 
            <div className="main-window">
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <PrivateRoute path="/main" component={HomeScreen} />
                    <Redirect to="/login"/>
                </Switch>
            </div>
        </div>     
      </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;
