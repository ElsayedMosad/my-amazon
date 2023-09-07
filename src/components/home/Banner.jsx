import Slider from "react-slick";
import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
  bannerImgFour,
  // bannerImgFive,
} from "../../assets/images";
import { useState } from "react";
const Banner = () => {
  const [dotActive, setDotActive] = useState(0);
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev, next) => {
      setDotActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "68%",
          transform: "translateX(-50%)",
        }}
      >
        <ul
          style={{
            margin: "0px",
            display: "flex",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "30px",
                height: "30px",
                color: "white",
                border: "1px #f3a847 solid",
                borderRadius: "50%",
                backgroundColor: "#131921",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }
            : {
                width: "30px",
                height: "30px",
                color: "white",
                border: "1px white solid",
                borderRadius: "50%",
                backgroundColor: "#232F3E",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }
        }
      >
        {i + 1}
      </div>
    ),
  };
  return (
    <div className=" h-full w-full overflow-hidden">
      <div className=" h-full w-full relative">
        <Slider {...settings}>
          <div>
            <img src={bannerImgOne} alt="bannerImgOne" />
          </div>
          <div>
            <img src={bannerImgTwo} alt="bannerImgTwo" />
          </div>
          <div>
            <img src={bannerImgThree} alt="bannerImgThree" />
          </div>
          <div>
            <img src={bannerImgFour} alt="bannerImgFour" />
          </div>
          <div>
            <img src={bannerImgThree} alt="bannerImgFive" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
