import { useState } from "react";

const useInput = (validateFn) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [enteredFieldTouched, setEnteredFieldTouched] = useState(false);

    const enteredValueIsValid = validateFn ? validateFn(enteredValue) : true;
    const inputIsInvalid = !enteredValueIsValid && enteredFieldTouched;
    
    const onInputChangeHandler = (event) => {
        setEnteredValue(event.target.value);
    };

    const onInputBlurHandler = (event) => {
        setEnteredFieldTouched(true);
    };

    const resetFieldStates = () => {
        setEnteredValue('');
        setEnteredFieldTouched(false);
    };

    return {
        onChangeFn: onInputChangeHandler,
        onBlurFn: onInputBlurHandler,
        setEnteredFieldTouched,
        resetFieldStates,
        enteredValue,
        enteredValueIsValid,
        inputIsInvalid 
    };
};

export default useInput;