import { Fragment } from "react";
import meals from '../../Assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from "./HeaderCardButton";
const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Meals Shop</h1>
                <HeaderCartButton onClick = {props.onShow} />

            </header>
            <div className={classes['main-image']}>
                <img src={meals} alt="The delicious Food" />
            </div>

        </Fragment>
    );
}

export default Header;