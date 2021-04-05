import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../header/header';
import ArticlesContainer from '../articles/articles';
import SingInForm from '../signInForm/signInForm';
import ProfileForm from '../profileForm/profileForm';
import SignUpForm from '../signUpForm/signUpForm';
import ArticleContainer from '../article/article';
import ArticleForm from '../articleForm/articleForm';
import './app.scss';

const App = () => (
    <div className="app-container">
      <Router>
        <Header />
        <Switch>
          <Route path="/" component={ArticlesContainer} exact />
          <Route path="/articles" component={ArticlesContainer} exact />
          <Route path="/new-article" component={ArticleForm} exact />
          <Route path="/sign-in" component={SingInForm} />
          <Route path="/profile" component={ProfileForm} />
          <Route path="/sign-up" component={SignUpForm} />
          <Route
            path="/articles/:slug/edit"
            render={({ match }) => {
              const { slug } = match.params;
              return <ArticleForm slug={slug} newArticle={false} />;
            }}
          />
          <Route
            path="/articles/:slug"
            render={({ match }) => {
              const { slug } = match.params;
              return <ArticleContainer slug={slug} />;
            }}
            exact
          />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );

export default App;
