import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import { images } from '../../constants';
import './AboutUs.css';

const AboutUs = () => {
  const sectionRef = useRef(null);
  const knifeWrapRef = useRef(null);
  const knifeImgRef = useRef(null);
  const isRotatingRef = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(knifeWrapRef.current, {
        y: -10,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const rotateKnife = () => {
    if (!knifeImgRef.current || isRotatingRef.current) return;
    isRotatingRef.current = true;

    gsap.to(knifeImgRef.current, {
      rotation: '+=360',
      duration: 1.1,
      ease: 'power3.out',
      transformOrigin: '50% 50%',
      overwrite: 'auto',
      onComplete: () => {
        isRotatingRef.current = false;
      },
    });
  };

  return (
    <div ref={sectionRef} className="app__aboutus app__bg flex__center section__padding" id="about">
      <div className="app__aboutus-overlay flex__center">
        <img src={images.G} alt="G_overlay" />
      </div>

      <div className="app__aboutus-content flex__center">
        <div className="app__aboutus-content_about">
          <h1 className="headtext__cormorant">About Us</h1>
          <img src={images.spoon} alt="about_spoon" className="spoon__img" />
          <p className="p__opensans">We built this house around hospitality first. Our menu is guided by craft, local ingredients, and timeless culinary principles that celebrate flavor without unnecessary complexity.</p>
        </div>

        <div className="app__aboutus-content_knife flex__center" ref={knifeWrapRef}>
          <img
            ref={knifeImgRef}
            src={images.knife}
            alt="about_knife"
            onClick={rotateKnife}
            onMouseEnter={rotateKnife}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                rotateKnife();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Rotate knife"
          />
        </div>

        <div className="app__aboutus-content_history">
          <h1 className="headtext__cormorant">Our History</h1>
          <img src={images.spoon} alt="about_spoon" className="spoon__img" />
          <p className="p__opensans">What started as a small chef's table has grown into a destination for thoughtful dining. Through every chapter, we have stayed committed to precision, warmth, and memorable service.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
