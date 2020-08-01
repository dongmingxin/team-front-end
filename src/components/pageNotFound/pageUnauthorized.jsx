import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/layout/menuContainer.scss';
import '../../style/layout/notFound.scss';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const pageUnauthorized = () => {
    return ( 
        <div className="container">
            <div className="contentContainer">
                <div className="notFoundIconWrapper">
                    <SentimentVeryDissatisfiedIcon className="notFoundIcon"/>
                </div>
                <div className="errorCode">401</div>
                <div className="errorMessage">Unauthorized</div>
                <div className="errorHandleMessage">
                    You are Unauthorized to access this page.
                    <Link to="/"> Click here</Link> back to the menu page 
                </div>
            </div>
        </div>
     );
}

export default pageUnauthorized;