import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import s from './Filter.module.css';
// import shortid from 'shortid';
import { contactsSelectors, changeFilter } from '../../redux/contacts';
import TextField from '@material-ui/core/TextField';
const Filter = ({ name, onChange }) => {
  return (
    <div className={s.filterWrapper}>
      {/* <label className={s.label} htmlFor={inputFilterId}>
        <span>Find contacts by name</span>
      </label>
      <input
        className={s.input}
        type="text"
        placeholder="Search"
        id={inputFilterId}
        value={name}
        onChange={onChange}
      /> */}
      <span className={s.text}>Find contacts by name</span>
      <TextField
        className={s.label}
        id="outlined-search"
        label="Search"
        type="search"
        // autoComplete="current-password"
        variant="outlined"
        value={name}
        name="name"
        onChange={onChange}
      />
    </div>
  );
};

Filter.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  value: contactsSelectors.getFilter(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: event => dispatch(changeFilter(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
