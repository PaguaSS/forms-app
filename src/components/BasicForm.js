import useInput from '../hooks/use-input';

const isEmailValid = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const isNotEmpty = value => value.trim().length > 0;

const BasicForm = (props) => {
  const {
    onChangeFn: firstNameInputChangeHandler,
    onBlurFn: firstNameInputBlurHandler,
    resetFieldStates: resetFirstNameInputStates,
    setEnteredFieldTouched: setEnteredFirstNameTouched,
    enteredValue: enteredFirstName,
    enteredValueIsValid: enteredFirstNameIsValid,
    inputIsInvalid: firstNameInputIsInvalid
  } = useInput(isNotEmpty);

  const {
    onChangeFn: lastNameInputChangeHandler,
    onBlurFn: lastNameInputBlurHandler,
    resetFieldStates: resetLastNameInputStates,
    setEnteredFieldTouched: setEnteredLastNameTouched,
    enteredValue: enteredLastName,
    enteredValueIsValid: enteredLastNameIsValid,
    inputIsInvalid: lastNameInputIsInvalid
  } = useInput(isNotEmpty);

  const {
    onChangeFn: emailInputChangeHandler,
    onBlurFn: emailInputBlurHandler,
    resetFieldStates: resetEmailInputStates,
    setEnteredFieldTouched: setEnteredEmailTouched,
    enteredValue: enteredEmail,
    enteredValueIsValid: enteredEmailIsValid,
    inputIsInvalid: emailInputIsInvalid
  } = useInput(isEmailValid);

  let formIsValid = false;

  if (enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredFirstNameTouched(true);
    setEnteredLastNameTouched(true);
    setEnteredEmailTouched(true);

    if (!formIsValid) {
      return;
    }

    resetFirstNameInputStates();
    resetLastNameInputStates();
    resetEmailInputStates();
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className={`form-control${firstNameInputIsInvalid ? ' invalid' : ''}`}>
          <label htmlFor='name'>First Name</label>
          <input 
            type='text' 
            id='name' 
            onChange={firstNameInputChangeHandler}
            onBlur={firstNameInputBlurHandler}
            value={enteredFirstName}
            />
            {firstNameInputIsInvalid && (
              <p className='error-text'>First Name must not be empty.</p>
            )}
        </div>
        <div className={`form-control${lastNameInputIsInvalid ? ' invalid' : ''}`}>
          <label htmlFor='name'>Last Name</label>
          <input 
            type='text' 
            id='name' 
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputBlurHandler}
            value={enteredLastName}
            />
            {lastNameInputIsInvalid && (
              <p className='error-text'>Last Name must not be empty.</p>
            )}
        </div>
      </div>
      <div className={`form-control${emailInputIsInvalid ? ' invalid' : ''}`}>
        <label htmlFor='name'>E-Mail Address</label>
        <input 
          type='text' 
          id='name' 
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
          />
          {emailInputIsInvalid && (
            <p className='error-text'>Email format is not valid.</p>
          )}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;