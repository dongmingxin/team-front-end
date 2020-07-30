import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/layout/menuContainer.scss';
import '../../style/layout/notFound.scss';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const PageNotFound = () => {
    return ( 
        <div className="container">
            <div className="contentContainer">
                <div className="notFoundIconWrapper">
                    <SentimentVeryDissatisfiedIcon className="notFoundIcon"/>
                </div>
                <div className="errorCode">404</div>
                <div className="errorMessage">Page not found</div>
                <div className="errorHandleMessage">
                    The Page your are looking for doesn't exist or other error occurred.
                    <Link to="/"> Click here</Link> back to the menu page 
                </div>
            </div>
        </div>
     );
}
 
export default PageNotFound;