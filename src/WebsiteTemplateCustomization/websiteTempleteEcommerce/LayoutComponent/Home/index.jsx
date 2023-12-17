import React from 'react';
import Slider from "react-slick";
import SliderCard from '../../CommonComponent/commonJs/SliderCard';
import SliderImage from '../../assets/images/sliderImage.png';
import FeatureImage from '../../assets/images/featueImage.png';
import OurStoryImage from '../../assets/images/ourStory.png';
import Footer from "../../FooterLayout/Footer";
import './home.scss';
import Header from '../../HeaderLayout/Header'

const index = () => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
  };

  const featureSection = [
    {
      id: 1,
      image: FeatureImage,
      bgColor: "bg-blue",
      text: "New Arrival"
    },
    {
      id: 2,
      image: FeatureImage,
    },
    {
      id: 3,
      image: FeatureImage,
      bgColor: "bg-blue",
      text: "New Arrival"
    },
    {
      id: 4,
      image: FeatureImage,
    },
    {
      id: 5,
      image: FeatureImage,
      bgColor: "bg-red",
      text: "On sale"
    },
    {
      id: 6,
      image: FeatureImage,
    },
  ];
  return (
    <React.Fragment>
      <Header />
      <section>
        <div className='rash-theme-hero-wrapper'>
          <div className='rash-theme-hero-image-div'>
            <div className='rash-hero-text'>
              <h1 className='rash-theme-hero-heading'>Bring <br /> on the <br />Heat</h1>
              <button className='buttonRash-primary button-hero'>Shop Now</button>
            </div>
          </div >
        </div>
      </section>
      {/* // carasoul section */}
      <section className='section-gap'>
        <div className='container'>
          <div className='text-center position-relative'>
            <h1 className='heading-main '>Best sellers</h1>
          </div>
          <div className='rash-theme-slider-container section-padding'>
            <Slider {...settings}>

              <SliderCard image={SliderImage} bgColor="bg-blue" text="New Arrival" />
              <SliderCard image={SliderImage} bgColor="bg-red" text="On Sale" />
              <SliderCard image={SliderImage} />
              <SliderCard image={SliderImage} bgColor="bg-blue" text="New Arrival" />
              <SliderCard image={SliderImage} bgColor="bg-red" text="On Sale" />
              <SliderCard image={SliderImage} />
              <SliderCard image={SliderImage} bgColor="bg-blue" text="New Arrival" />
              <SliderCard image={SliderImage} bgColor="bg-red" text="On Sale" />
              <SliderCard image={SliderImage} />
            </Slider>
          </div>
          <div className='text-center button-gap'>
            <button className='buttonRash-primary'>View all</button>
          </div>
        </div>
      </section>
      {/* Feature Category */}
      <section className='section-gap'>
        <div className='container'>
          <div className='text-center position-relative'>
            <h1 className='heading-main '>Featured Categories</h1>
          </div>
          <div className='rash-theme-featureCategory-container section-padding'>
            <div className='featurecategory-image-div'>
              <img src={SliderImage} alt="categoryImage" />
              <div className='featurecategory-overlay'></div>
              <div className='featurecategory-image-div-text'>
                <p className='feature-text-para'>Casual</p>
              </div>
            </div>
            <div className='featurecategory-image-div'>
              <img src={SliderImage} alt="categoryImage" />
              <div className='featurecategory-overlay'></div>
              <div className='featurecategory-image-div-text'>
                <p className='feature-text-para'>Formal</p>
              </div>
            </div>
            <div className='featurecategory-image-div'>
              <img src={SliderImage} alt="categoryImage" />
              <div className='featurecategory-overlay'></div>
              <div className='featurecategory-image-div-text'>
                <p className='feature-text-para'>Party wear </p>
              </div>
            </div>
          </div>
          <div className='text-center button-gap'>
            <button className='buttonRash-primary'>View all</button>
          </div>
        </div>
      </section>
      {/* featureProduct section */}
      <section className='section-gap'>
        <div className='container'>
          <div className='text-center position-relative'>
            <h1 className='heading-main '>Featured Products</h1>
          </div>
          <div className='rash-theme-feture-container section-padding'>
            {
              featureSection.map((options) => {
                return (
                  <SliderCard key={options.id} image={options.image} bgColor={options.bgColor} text={options.text} />
                )
              })
            }
          </div>
          <div className='text-center button-gap'>
            <button className='buttonRash-primary'>View all</button>
          </div>
        </div>
      </section>
      {/* our story section */}
      <section className='section-gap'>
        <div className='container'>
          <div className='text-center position-relative'>
            <h1 className='heading-main '>Our Story</h1>
          </div>
          <div className='rash-theme-our-story-container section-padding'>
            <div className='our-story-left'>
              <p>The Kanchipuram silk sari is a type of silk sari made in the Kanchipuram region in Tamil Nadu, India. These saris are worn as bridal & special occasion saris by most women in Tamil Nadu, Kerala, Karnataka & Andhra Pradesh. It has been recognized as a Geographical indication by the Government of India in 2005–2006...</p>

            </div>
            <div className='our-story-right'>
              <img src={OurStoryImage} alt="ourStroyImage" />
            </div>
          </div>

        </div>
      </section>
      <Footer />
    </React.Fragment>



  )
}

export default index