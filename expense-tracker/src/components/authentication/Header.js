import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from './store/Auth-slice';
import classes from "./Header.module.css";

const Header = () => {
        const dispatch = useDispatch();
        const history = useHistory();
        const isAuth = useSelector(state => state.auth.isLoggedIn);
        const totalSpent = useSelector(state => state.expense.totalSpent);

        const logoutHandler = () => {
            dispatch(authActions.logout());
            history.replace('./')
        }
        return ( <
            header className = { classes.header } >
            <
            h1 > Expense Tracker < /h1>

            <
            nav >
            <
            ul >

            <
            li >
            <
            button onClick = { logoutHandler } > Logout < /button> <
            /li>

            <
            li > {
                totalSpent > 10000 && < button > active premiun < /button>} <
                /li> <
                /ul> <
                /nav>

                <
                /header>
            );
        }
        export default Header;