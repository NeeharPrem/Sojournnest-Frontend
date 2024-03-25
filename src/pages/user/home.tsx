import Navbar from "../../components/Navbar";
import HomePage from "../../components/user/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import '../../index.css'

const UserHome = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const images = [
    'https://a0.muscache.com/im/pictures/hosting/Hosting-997566368472977053/original/2b023175-6872-4202-ace0-29bc06504385.jpeg?im_w=960',
    'https://img.getimg.ai/generated/img-Qa7OYPr4iGhpExPUQsoIw.jpeg?im_w=960'

  ];

  return (
    <>
      <Navbar />
      <div>
        <div id="banner" className="w-full justify-center relative pt-16 overflow-hidden">
          <div className="absolute w-full h-full top-0 flex items-center pl-10 z-10">
            <div className="text-white flex flex-col text-5xl font-bold">
              <div className="font-Arizonia text-orange-400">
                Welcome to Render
              </div>
              <div>Discover Your Favorite</div>
              <div>Place with Us</div>
            </div>
          </div>
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Slide ${index}`} className="w-full lg:h-96 object-cover" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="flex flex-col relative lg:px-12 px-5 sm:px-10 md:px-10 pt-1">
        <div>
          <HomePage />
        </div>
      </div>
    </>
  );
};

export default UserHome;
