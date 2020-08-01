import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../style/layout/menuHeader.scss';

const MenuSlider = () => {
    return ( 
        <div className="menuSlider">
            <Slider
                speed={500}
                slideToShow={1}
                slidesToScroll={1}
                infinite={true}
                dots={true}
                autoplay={true}
                autoplaySpeed={2000}
                arrows={false}
            >
                <div className="menuSlider__item">
                    <img src="https://jr-pizza-backend-img.s3-ap-southeast-2.amazonaws.com/ad4.jpg" alt="sliderContent1"/>
                </div>
                <div className="menuSlider__item">
                    <img src="https://jr-pizza-backend-img.s3-ap-southeast-2.amazonaws.com/ad5.jpg" alt="sliderContent2"/>
                </div>
                <div className="menuSlider__item">
                    <img src="https://jr-pizza-backend-img.s3-ap-southeast-2.amazonaws.com/ad6.jpg" alt="sliderContent3"/>
                </div>
            </Slider>
        </div>
     );
}
 
export default MenuSlider;