import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/home';
import Layout from './hoc/Layout/layout';

import NewsArticle from './components/Articles/News/Post/index';
import VideoArticle from './components/Articles/Videos/Video/index';
import NewsMain from './components/Articles/News/Main/index';
import VideosMain from './components/Articles/Videos/Main/index';
import SignIn from './components/SignIn/signin';
import Dashboard from './components/Dashboard/dashboard';

const Routes = (props) => {
        return(
            <Layout user={props.user}>
                 <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/news" exact component={NewsMain}/>
                    <Route path="/articles/:id" exact component={NewsArticle}/>
                    <Route path="/videos/:id" exact component={VideoArticle}/>
                    <Route path="/videos" exact component={VideosMain}/>
                    <Route path="/sign-in" exact component={SignIn} />
                    <Route path="/dashboard" exact component={Dashboard}/>
                </Switch>
            </Layout>  
        )
}

export default Routes;