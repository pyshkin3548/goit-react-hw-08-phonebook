import React from 'react';
import { connect } from 'react-redux';
import { authSelectors } from '../../redux/auth';
import s from './AppBar.module.css';
import Navigation from '../Navigation';
import UserMenu from '../UserMenu';
import AuthNav from '../AuthNav';
import AppBar from '@material-ui/core/AppBar';
import Container from '../Container';

const MainAppBar = ({ isAuthenticated }) => (
  <AppBar position="static">
    <Container>
      <div className={s.wrapper}>
        <Navigation />
        {isAuthenticated ? <UserMenu /> : <AuthNav />}
      </div>
    </Container>
  </AppBar>
);

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.getIsAuthenticated(state),
});

export default connect(mapStateToProps, null)(MainAppBar);
