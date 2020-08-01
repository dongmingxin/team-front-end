import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/layout/footer.scss';

const Footer = () => {
    return ( 
        <div className="footerContianer">
            <div className="footer">
                <div className="footer__contact">
                    <div className="footer__contact--title">
                        CONTACT
                    </div>
                    <div className="footer__contact--item">
                        FAKE Street 2020 Drive 
                    </div>
                    <div className="footer__contact--item">
                        City Brisbane  
                    </div>
                    <div className="footer__contact--item">
                        STATE QLD, ZIP CODE 1450  
                    </div>
                    <div className="footer__contact--item">
                        Contact Number 443 4098 7663  
                    </div>

                </div>
                <div className="footer__menu">
                    <div className="footer__menu--title">MENU</div>
                    <div className="footer__menu--item"><Link  to="/pizza" style={{textDecoration: "none", color:"white"}}>PIZZAS</Link></div>
                    <div className="footer__menu--item"><Link to="/sides" style={{textDecoration: "none", color:"white"}}>SIDES</Link></div>
                    <div className="footer__menu--item"><Link to="/desserts" style={{textDecoration: "none", color:"white"}}>DESSERTS</Link></div>
                    <div className="footer__menu--item"><Link to="/drinks" style={{textDecoration: "none", color:"white"}}>DRINKS</Link></div>
                </div>
                <div className="footer__recentPosts">
                    <div className="footer__recentPosts--title">
                        RECENT POSTS
                    </div>
                    <div className="footer__recentPosts--item">
                        Best pizza shop?
                    </div>
                    <div className="footer__recentPosts--item">
                        How to Select a health Pizza
                    </div>
                    <div className="footer__recentPosts--item">
                        World pizza
                    </div>

                </div>
            </div>
            <div className="copyRight">
                "&copy; 2020 All rights reserved. Designed by MINGXIN DONG"
            </div>
        </div>
     );
}
 
export default Footer;