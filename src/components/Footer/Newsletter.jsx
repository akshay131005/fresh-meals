import React from 'react';

import SubHeading from '../SubHeading/SubHeading';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    if (!email.trim() || !email.includes('@')) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setMessage('Subscribed successfully. We will keep you updated.');
    setEmail('');
  };

  return (
    <div className="app__newsletter">
      <div className="app__newsletter-heading">
        <SubHeading title="Newsletter" />
        <h1 className="headtext__cormorant">Subscribe To Our Newsletter</h1>
        <p className="p__opensans">And never miss latest Updates!</p>
      </div>
      <form className="app__newsletter-input flex__center" onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit" className="custom__button">Subscribe</button>
      </form>
      {message && <p className="app__newsletter-message p__opensans">{message}</p>}
    </div>
  );
};

export default Newsletter;
