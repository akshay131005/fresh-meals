import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Header.css';

const Header = () => {
  const headerRef = useRef(null);
  const infoRef = useRef(null);
  const imageRef = useRef(null);
  const isImageAnimatingRef = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const introTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      introTimeline
        .from(infoRef.current?.children || [], {
          opacity: 0,
          y: 24,
          duration: 0.8,
          stagger: 0.1,
        })
        .from(
          imageRef.current,
          {
            opacity: 0,
            scale: 0.92,
            y: 22,
            duration: 1,
          },
          '-=0.5',
        );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const goToMenu = () => {
    const menuSection = document.getElementById('menu');
    menuSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const onImageHover = () => {
    if (!imageRef.current || isImageAnimatingRef.current) return;
    isImageAnimatingRef.current = true;

    const hoverTimeline = gsap.timeline({
      onComplete: () => {
        isImageAnimatingRef.current = false;
      },
    });

    hoverTimeline
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
    <div ref={headerRef} className="app__header app__wrapper section__padding" id="home">
      <div ref={infoRef} className="app__wrapper_info">
        <SubHeading title="Chase the new flavour" />
        <h1 className="app__header-h1">The Key To Fine Dining</h1>
        <p className="p__opensans" style={{ margin: '2rem 0' }}>
          Fine dining begins with intention. Every plate in our kitchen balances seasonality,
          technique, and storytelling, so each course feels both familiar and unforgettable.
        </p>
        <button type="button" className="custom__button" onClick={goToMenu}>Explore Menu</button>
      </div>

      <div className="app__wrapper_img app__header-img">
        <img ref={imageRef} src={images.welcome} alt="header_img" onMouseEnter={onImageHover} />
      </div>
    </div>
  );
};

export default Header;
