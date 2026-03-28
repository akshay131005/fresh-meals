import React, { useRef } from 'react';
import { gsap } from 'gsap';

import { SubHeading } from '../../components';
import { images, data } from '../../constants';
import './Laurels.css';

const AwardCard = ({ award: { imgUrl, title, subtitle } }) => (
  <div className="app__laurels_awards-card">
    <img src={imgUrl} alt="awards" />
    <div className="app__laurels_awards-card_content">
      <p className="p__cormorant" style={{ color: '#DCCA87' }}>{title}</p>
      <p className="p__opensans">{subtitle}</p>
    </div>
  </div>
);

const Laurels = () => {
  const imageRef = useRef(null);
  const isAnimatingRef = useRef(false);

  const onImageHover = () => {
    if (!imageRef.current || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    })
      .to(imageRef.current, {
        scale: 1.12,
        duration: 0.35,
        ease: 'power2.out',
      })
      .to(imageRef.current, {
        rotateY: '+=360',
        duration: 2.8,
        ease: 'power2.inOut',
      }, '<')
      .to(imageRef.current, {
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
      }, '-=0.35');
  };

  return (
    <div className="app__bg app__wrapper section__padding" id="awards">
      <div className="app__wrapper_info">
        <SubHeading title="Awards & recognition" />
        <h1 className="headtext__cormorant">Our Laurels</h1>

        <div className="app__laurels_awards">
          {data.awards.map((award) => <AwardCard award={award} key={award.title} />)}
        </div>
      </div>

      <div className="app__wrapper_img app__spin3d-wrap">
        <img ref={imageRef} className="app__spin3d-img" src={images.laurels} alt="laurels_img" onMouseEnter={onImageHover} />
      </div>
    </div>
  );
};

export default Laurels;
