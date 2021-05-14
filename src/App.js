import React, { Component, Suspense, lazy } from 'react';
import { Switch } from 'react-router';
import { connect } from 'react-redux';
import { authOperations } from './redux/auth';
// import Container from './components/Container';
import MainAppBar from './components/AppBar';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import LoaderSpinner from './components/Loader';

const HomeView = lazy(() =>
  import('./views/HomeView' /* webpackChunkName: "home-view" */),
);
const RegisterView = lazy(() =>
  import('./views/RegisterView' /* webpackChunkName: "register-view" */),
);
const LoginView = lazy(() =>
  import('./views/LoginView' /* webpackChunkName: "login-view" */),
);
const ContactsView = lazy(() =>
  import('./views/ContactsView' /* webpackChunkName: "contacts-view" */),
);

class App extends Component {
  componentDidMount() {
    this.props.onGetCurrentUser();
  }

  render() {
    return (
      <>
        <MainAppBar />
        {/* <Container> */}
        <Suspense fallback={<LoaderSpinner />}>
          <Switch>
            <PublicRoute exact path="/" component={HomeView} />
            <PublicRoute
              path="/register"
              restricted
              redirectTo={'/contacts'}
              component={RegisterView}
            />
            <PublicRoute
              path="/login"
              restricted
              redirectTo={'/contacts'}
              component={LoginView}
            />
            <PrivateRoute
              path="/contacts"
              redirectTo={'/login'}
              component={ContactsView}
            />
          </Switch>
        </Suspense>
        {/* </Container> */}
      </>
    );
  }
}

const mapDispatchToProps = {
  onGetCurrentUser: authOperations.getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);
