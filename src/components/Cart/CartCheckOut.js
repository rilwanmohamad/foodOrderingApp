import classes from './CartCheckOut.module.css'
import { useRef, useState } from 'react';
const isEmpty = value => value.trim() === '';
const isSixNumb = value => value.trim().length === 6;

const CartCheckOut = (props) => {
    const [userFormIsValid, setUserFormIsValid] = useState({
        name: true,
        house: true,
        street: true,
        zip: true
    });

    const nameInputRef = useRef();
    const houseInputRef = useRef();
    const streetInputRef = useRef();
    const zipInputRef = useRef();



    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredHouse = houseInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredZip = zipInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredHouseIsValid = !isEmpty(enteredHouse);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredZipIsValid = isSixNumb(enteredZip);

        setUserFormIsValid({
            name: enteredNameIsValid,
            house: enteredHouseIsValid,
            street: enteredStreetIsValid,
            zip: enteredZipIsValid
        });


        const fromIsValid = enteredNameIsValid && enteredHouseIsValid && enteredStreetIsValid && enteredZipIsValid;

        if (!fromIsValid) {
            return;
        }
        props.onConfirm({
            name: enteredName,
            house: enteredHouse,
            street: enteredStreet,
            zipcode: enteredZip,
        });

    }
    const nameControlClasses = `${classes.control} ${userFormIsValid.name ? '' : classes.invalid
        }`;
    const houseControlClasses = `${classes.control} ${userFormIsValid.house ? '' : classes.invalid
        }`;
    const streetControlClasses = `${classes.control} ${userFormIsValid.street ? '' : classes.invalid
        }`;
    const zipControlClasses = `${classes.control} ${userFormIsValid.zip ? '' : classes.invalid
        }`;




    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" ref={nameInputRef} />
                {!userFormIsValid.name && <p>please enter a valid name..!</p>}
            </div>
            <div className={houseControlClasses}>
                <label htmlFor="number">House No.</label>
                <input type="text" id="name" ref={houseInputRef} />

                {!userFormIsValid.house && <p>please enter a valid house number..!</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor="street">street</label>
                <input type="text" id="street" ref={streetInputRef} />
                {!userFormIsValid.street && <p>please enter a valid street..!</p>}
            </div>
            <div className={zipControlClasses}>
                <label htmlFor="city">zip code</label>
                <input type="text" id="city" ref={zipInputRef} />
                {!userFormIsValid.zip && <p>please enter a valid zip code..!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onClose} >cancel</button>
                <button className={classes.submit} >confirm</button>
            </div>
        </form>
    );
}

export default CartCheckOut;