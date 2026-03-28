import React, { useEffect } from 'react';
import { BsInstagram } from 'react-icons/bs';
import { gsap } from 'gsap';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Gallery.css';

const Gallery = () => {
  const trackRef = React.useRef(null);
  const sectionRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const cardsRef = React.useRef([]);
  const galleryImages = [images.gallery01, images.gallery02, images.gallery03, images.gallery04];
  const loopImages = [...galleryImages, ...galleryImages];

  const onViewMore = () => {
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    let autoTween;
    let pauseOnHover;
    let resumeOnLeave;
    let hasHoverListeners = false;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children || [], {
        opacity: 0,
        y: 22,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
      });

      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
      });

      const trackWidth = trackRef.current.scrollWidth / 2;
      autoTween = gsap.to(trackRef.current, {
        x: -trackWidth,
        duration: 12,
        repeat: -1,
        ease: 'none',
        paused: false,
      });

      pauseOnHover = () => autoTween?.pause();
      resumeOnLeave = () => autoTween?.play();

      trackRef.current.addEventListener('mouseenter', pauseOnHover);
      trackRef.current.addEventListener('mouseleave', resumeOnLeave);
      hasHoverListeners = true;
    }, sectionRef);

    return () => {
      if (hasHoverListeners && trackRef.current) {
        trackRef.current.removeEventListener('mouseenter', pauseOnHover);
        trackRef.current.removeEventListener('mouseleave', resumeOnLeave);
      }

      autoTween?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className="app__gallery flex__center">
      <div ref={contentRef} className="app__gallery-content">
        <SubHeading title="Instagram" />
        <h1 className="headtext__cormorant">Photo Gallery</h1>
        <p className="p__opensans" style={{ color: '#AAAAAA', marginTop: '2rem' }}>A visual journal of our kitchen, signature dishes, and evening atmosphere. Follow along for seasonal menus, behind-the-scenes moments, and chef-driven specials.</p>
        <button type="button" className="custom__button" onClick={onViewMore}>View More</button>
      </div>
      <div className="app__gallery-images">
        <div className="app__gallery-images_viewport">
          <div className="app__gallery-images_container" ref={trackRef}>
            {loopImages.map((image, index) => (
              <div
                className="app__gallery-images_card flex__center"
                key={`gallery_image-${index + 1}`}
                ref={(element) => {
                  cardsRef.current[index] = element;
                }}
              >
                <img
                  src={image}
                  alt="gallery_image"
                />
                <BsInstagram className="gallery__image-icon" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
