import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import contactsOperations from '../../../redux/contacts/contacts-operations';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';
import shortid from 'shortid';
import Alert from '../../Alert';
import contactsSelectors from '../../../redux/contacts/contacts-selectors';
import TextField from '@material-ui/core/TextField';

class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
    message: null,
  };

  inputNameId = shortid.generate();
  inputNumberId = shortid.generate();

  handleSubmit = e => {
    const { name, number } = this.state;
    e.preventDefault();

    if (name === '') {
      this.showAlert('Please enter your contact name!');
      return;
    }

    if (number === '') {
      this.showAlert('Please enter the contact phone number!');
      return;
    }

    if (this.props.contacts.some(contact => contact.name === name)) {
      this.showAlert(`${name} is already in contacts`);
      return;
    }

    this.props.onSubmit(name, number);
    this.reset();
  };

  showAlert = text => {
    this.reset();
    this.setState({ message: text });
    setTimeout(() => this.setState({ message: null }), 2000);
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handlerChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { message, name, number } = this.state;

    return (
      <>
        <Alert message={message} />

        <form className={s.form} onSubmit={this.handleSubmit}>
          {/* <label className={s.label} htmlFor={this.inputNameId}>
            <span>Name</span>
          </label>
          <input
            className={s.input}
            type="text"
            id={this.inputNameId}
            value={this.state.name}
            name="name"
            placeholder="Enter your name"
            // required
            onChange={this.handlerChange}
          /> */}

          <TextField
            className={s.label}
            id="outlined-name"
            label="Name"
            type="name"
            autoComplete="current-password"
            variant="outlined"
            value={name}
            name="name"
            onChange={this.handlerChange}
          />

          {/* <label className={s.label} htmlFor={this.inputNumberId}>
            <span>Number</span>
          </label>
          <input
            className={s.input}
            type="tel"
            id={this.inputNumberId}
            value={this.state.number}
            name="number"
            placeholder="Enter your number"
            onChange={this.handlerChange}
          /> */}

          <TextField
            className={s.label}
            id={this.inputNumberId}
            label="Number"
            type="number"
            autoComplete="current-password"
            variant="outlined"
            value={number}
            name="number"
            onChange={this.handlerChange}
          />
          <Button variant="contained" color="primary" type="submit">
            Add contact
          </Button>
          {/* <button className={s.button}>Add contact</button> */}
        </form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  contacts: contactsSelectors.getContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (name, number) =>
    dispatch(contactsOperations.addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
