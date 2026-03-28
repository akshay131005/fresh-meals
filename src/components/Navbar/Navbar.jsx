import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import './Navbar.css';

const AUTH_USERS_KEY = 'freshmeals_users';
const AUTH_CURRENT_USER_KEY = 'freshmeals_current_user';

const safeParse = (value, fallback) => {
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

const getStoredUsers = () => safeParse(localStorage.getItem(AUTH_USERS_KEY), []);

const getStoredCurrentUser = () => safeParse(localStorage.getItem(AUTH_CURRENT_USER_KEY), null);

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [authMode, setAuthMode] = React.useState('login');
  const [currentUser, setCurrentUser] = React.useState(null);
  const [authState, setAuthState] = React.useState({
    loginEmail: '',
    loginPassword: '',
    registerName: '',
    registerEmail: '',
    registerPassword: '',
  });
  const [authMessage, setAuthMessage] = React.useState('');
  const [authMessageType, setAuthMessageType] = React.useState('info');

  React.useEffect(() => {
    setCurrentUser(getStoredCurrentUser());
  }, []);

  const resetAuthFields = () => {
    setAuthState({
      loginEmail: '',
      loginPassword: '',
      registerName: '',
      registerEmail: '',
      registerPassword: '',
    });
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthMessage('');
    setAuthMessageType('info');
    setShowAuthModal(true);
  };

  const closeAuth = () => {
    setShowAuthModal(false);
    setAuthMessage('');
    setAuthMessageType('info');
    resetAuthFields();
  };

  const onAuthFieldChange = (event) => {
    const { name, value } = event.target;
    setAuthState((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = (event) => {
    event.preventDefault();
    if (!authState.loginEmail || !authState.loginPassword) {
      setAuthMessage('Please enter your email and password.');
      setAuthMessageType('error');
      return;
    }

    const users = getStoredUsers();
    const matchedUser = users.find(
      (user) => user.email === authState.loginEmail.trim().toLowerCase() && user.password === authState.loginPassword,
    );

    if (!matchedUser) {
      setAuthMessage('Invalid email or password. Please try again.');
      setAuthMessageType('error');
      return;
    }

    const userSession = {
      name: matchedUser.name,
      email: matchedUser.email,
    };

    localStorage.setItem(AUTH_CURRENT_USER_KEY, JSON.stringify(userSession));
    setCurrentUser(userSession);
    setAuthMessage('Logged in successfully. Welcome back.');
    setAuthMessageType('success');
    setShowAuthModal(false);
    resetAuthFields();
  };

  const onRegister = (event) => {
    event.preventDefault();
    if (!authState.registerName || !authState.registerEmail || !authState.registerPassword) {
      setAuthMessage('Please complete all registration fields.');
      setAuthMessageType('error');
      return;
    }

    const normalizedEmail = authState.registerEmail.trim().toLowerCase();
    if (!isValidEmail(normalizedEmail)) {
      setAuthMessage('Please enter a valid email address.');
      setAuthMessageType('error');
      return;
    }

    if (authState.registerPassword.length < 6) {
      setAuthMessage('Password must be at least 6 characters long.');
      setAuthMessageType('error');
      return;
    }

    const users = getStoredUsers();
    const alreadyExists = users.some((user) => user.email === normalizedEmail);
    if (alreadyExists) {
      setAuthMessage('This email is already registered. Please log in.');
      setAuthMessageType('error');
      setAuthMode('login');
      setAuthState((prev) => ({ ...prev, loginEmail: normalizedEmail }));
      return;
    }

    const newUser = {
      name: authState.registerName.trim(),
      email: normalizedEmail,
      password: authState.registerPassword,
    };

    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify([...users, newUser]));

    setAuthMessage('Registration complete. You can now log in.');
    setAuthMessageType('success');
    setAuthMode('login');
    setAuthState((prev) => ({
      ...prev,
      loginEmail: normalizedEmail,
      loginPassword: '',
      registerPassword: '',
    }));
  };

  const onLogout = () => {
    localStorage.removeItem(AUTH_CURRENT_USER_KEY);
    setCurrentUser(null);
    setAuthMessage('');
    setAuthMessageType('info');
    setShowAuthModal(false);
  };

  return (
    <>
      <nav className="app__navbar">
        <div className="app__navbar-logo">
          <p className="app__brand-name">Fresh Meals</p>
        </div>
        <ul className="app__navbar-links">
          <li className="p__opensans"><a href="#home">Home</a></li>
          <li className="p__opensans"><a href="#about">About</a></li>
          <li className="p__opensans"><a href="#menu">Menu</a></li>
          <li className="p__opensans"><a href="#awards">Awards</a></li>
          <li className="p__opensans"><a href="#contact">Contact</a></li>
        </ul>
        <div className="app__navbar-login">
          {currentUser ? (
            <>
              <span className="app__user-greeting p__opensans">Hi, {currentUser.name}</span>
              <div />
              <button type="button" className="app__auth-link p__opensans" onClick={onLogout}>Log Out</button>
            </>
          ) : (
            <>
              <button type="button" className="app__auth-link p__opensans" onClick={() => openAuth('login')}>Log In</button>
              <div />
              <button type="button" className="app__auth-link p__opensans" onClick={() => openAuth('register')}>Registration</button>
            </>
          )}
        </div>
        <div className="app__navbar-smallscreen">
          <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
          {toggleMenu && (
            <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
              <MdOutlineRestaurantMenu fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
              <ul className="app__navbar-smallscreen_links">
                <li><a href="#home" onClick={() => setToggleMenu(false)}>Home</a></li>
                <li><a href="#about" onClick={() => setToggleMenu(false)}>About</a></li>
                <li><a href="#menu" onClick={() => setToggleMenu(false)}>Menu</a></li>
                <li><a href="#awards" onClick={() => setToggleMenu(false)}>Awards</a></li>
                <li><a href="#contact" onClick={() => setToggleMenu(false)}>Contact</a></li>
                <li>
                  {currentUser ? (
                    <button
                      type="button"
                      className="app__auth-link p__opensans"
                      onClick={() => {
                        setToggleMenu(false);
                        onLogout();
                      }}
                    >
                      Log Out ({currentUser.name})
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="app__auth-link p__opensans"
                      onClick={() => {
                        setToggleMenu(false);
                        openAuth('login');
                      }}
                    >
                      Log In / Registration
                    </button>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {showAuthModal && (
        <div className="app__auth-modal">
          <div className="app__auth-modal_content">
            <button type="button" className="app__auth-close" onClick={closeAuth} aria-label="Close authentication dialog">x</button>
            <h2 className="headtext__cormorant">{authMode === 'login' ? 'Log In' : 'Create Account'}</h2>

            <div className="app__auth-tabs">
              <button type="button" className={authMode === 'login' ? 'is-active' : ''} onClick={() => setAuthMode('login')}>Log In</button>
              <button type="button" className={authMode === 'register' ? 'is-active' : ''} onClick={() => setAuthMode('register')}>Register</button>
            </div>

            {authMode === 'login' ? (
              <form className="app__auth-form" onSubmit={onLogin}>
                <input name="loginEmail" type="email" placeholder="Email" value={authState.loginEmail} onChange={onAuthFieldChange} autoComplete="email" required />
                <input name="loginPassword" type="password" placeholder="Password" value={authState.loginPassword} onChange={onAuthFieldChange} autoComplete="current-password" required />
                <button type="submit" className="custom__button">Log In</button>
              </form>
            ) : (
              <form className="app__auth-form" onSubmit={onRegister}>
                <input name="registerName" type="text" placeholder="Full Name" value={authState.registerName} onChange={onAuthFieldChange} autoComplete="name" required />
                <input name="registerEmail" type="email" placeholder="Email" value={authState.registerEmail} onChange={onAuthFieldChange} autoComplete="email" required />
                <input name="registerPassword" type="password" placeholder="Create Password" value={authState.registerPassword} onChange={onAuthFieldChange} autoComplete="new-password" required />
                <button type="submit" className="custom__button">Register</button>
              </form>
            )}

            {authMessage && <p className={`app__auth-message p__opensans is-${authMessageType}`}>{authMessage}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
