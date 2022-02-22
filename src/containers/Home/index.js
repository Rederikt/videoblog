import React, {useContext} from 'react';
import { AuthContext } from '../../context'

export const Home = () => {
    const {currentUser} = useContext(AuthContext);
    return (
        <div className="greet">
            <h1>Привіт, {currentUser}!</h1>
            <h2>Натисни кнопку на сайдбарі, <br/>щоб переглянути можливості додатку!</h2>
        </div>
    )
}
