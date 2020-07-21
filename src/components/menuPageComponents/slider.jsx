import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../style/layout/menuHeader.scss';
import sliderContent1 from '../../img/ad1.PNG';
import sliderContent2 from '../../img/ad2.PNG';
import sliderContent3 from '../../img/ad3.PNG';

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
                    <img src={sliderContent1} alt="sliderContent1"/>
                </div>
                <div className="menuSlider__item">
                    <img src={sliderContent2} alt="sliderContent2"/>
                </div>
                <div className="menuSlider__item">
                    <img src={sliderContent3} alt="sliderContent3"/>
                </div>
            </Slider>
        </div>
     );
}
 
export default MenuSlider;