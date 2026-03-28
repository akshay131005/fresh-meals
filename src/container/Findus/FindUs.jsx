import React, { useRef } from 'react';
import { gsap } from 'gsap';

import { SubHeading } from '../../components';
import { images } from '../../constants';

const FindUs = () => {
  const imageRef = useRef(null);
  const isAnimatingRef = useRef(false);

  const onImageHover = () => {
    if (!imageRef.current || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
      onInterrupt: () => {
        isAnimatingRef.current = false;
      },
    })
      .to(imageRef.current, {
        scale: 1.14,
        z: 30,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1200,
        force3D: true,
      })
      .to(imageRef.current, {
        rotateY: '+=720',
        rotateX: '+=12',
        duration: 3.2,
        ease: 'power2.inOut',
      }, '<')
      .to(imageRef.current, {
        z: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.9,
        ease: 'back.out(1.7)',
      }, '-=0.45');
  };

  return (
    <div className="app__bg app__wrapper section__padding" id="contact">
      <div className="app__wrapper_info">
        <SubHeading title="Contact" />
        <h1 className="headtext__cormorant" style={{ marginBottom: '3rem' }}>Find Us</h1>
        <div className="app__wrapper-content">
          <p className="p__opensans">Lane Ends Bungalow, Whatcroft Hall Lane, Rudheath, CW9 75G</p>
          <p className="p__cormorant" style={{ color: '#DCCA87', margin: '2rem 0' }}>Opening Hours</p>
          <p className="p__opensans">Mon - Fri: 10:00 am - 02:00 am</p>
          <p className="p__opensans">Sat - Sun: 10:00 am - 03:00 am</p>
        </div>
      </div>

      <div className="app__wrapper_img app__spin3d-wrap">
        <img
          ref={imageRef}
          className="app__spin3d-img"
          src={images.findus}
          alt="finus_img"
          onMouseEnter={onImageHover}
          onClick={onImageHover}
          onTouchStart={onImageHover}
        />
      </div>
    </div>
  );
};

export default FindUs;
