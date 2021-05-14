import React from 'react';
import { connect } from 'react-redux';
import { authSelectors, authOperations } from '../../redux/auth';
import Button from '@material-ui/core/Button';
import defaultAvatar from './ava.svg';
import s from './UserMenu.module.css';
import Avatar from '@material-ui/core/Avatar';

// const styles = {
//   container: {
//     display: 'flex',
//     alignItems: 'center',
//   },
//   avatar: {
//     marginRight: 4,
//   },
//   name: {
//     fontWeight: 700,
//     marginRight: 12,
//   },
// };

const UserMenu = ({ avatar, name, onLogout }) => (
  <div className={s.container}>
    <Avatar alt="Avatar" src={avatar} />
    {/* <img src={avatar} alt="" width="32" className={s.avatar} /> */}
    <span className={s.name}>Welcome, {name}</span>
    <Button
      variant="contained"
      color="secondary"
      type="button"
      onClick={onLogout}
    >
      Logout
    </Button>
    {/* <button type="button" onClick={onLogout}>
      Logout
    </button> */}
  </div>
);

const mapStateToProps = state => ({
  name: authSelectors.getUserName(state),
  avatar: defaultAvatar,
});

const mapDispatchToProps = {
  onLogout: authOperations.logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
