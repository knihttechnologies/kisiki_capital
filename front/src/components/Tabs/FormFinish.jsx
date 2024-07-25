import React, {useContext} from 'react';
import FormContext from '../../context/FormContext';
import './styles.css';

const FormFinish = () => {

    const myContext = useContext(FormContext);
    const updateContext = myContext.userDetails;

    const name = updateContext.firstName;

    const finish = () => {
        console.log(updateContext);
    }
    return (
        <div className="container">
            <p>Your Payment is being processed</p>
            <p>Thanks for {name} your details</p>
            <img className="done" src="https://www.svgrepo.com/show/13650/success.svg" alt="successful" />
            <button className="doneSubmit" onClick={finish}>Done</button>
        </div>
    );
};

export default FormFinish;