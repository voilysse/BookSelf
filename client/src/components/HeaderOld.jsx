


<header className="HeaderContainer">
  <Link to="/" className="HeaderLogoLink">
    <img className="HeaderLogo" src="/images/logo.png" alt="Bookself Logo" />
  </Link>
  <nav className="HeaderNav">
    <Link to="/">Home</Link>
    <Link to="/browse">Browse</Link>
    <Link to="/forum">Forum</Link>
    {user && <Link to="/shelves">My Books</Link>}
    {user && <Link to={`/profile`}>Profile</Link>}
    {user && <Link to={`/community`}>Community</Link>}
  </nav>


  <div className="HeaderActions">
    {user ? (
      <>
        <span className="HeaderWelcome">Hi, {user.username}</span>
        <PrimaryButton text="Logout" onClick={handleLogout} />
      </>
    ) : (
      <>
        <Link to="/login">
          <SecondaryButton text="Log In" />
        </Link>
        <Link to="/register">
          <PrimaryButton text="Sign Up" />
        </Link>
      </>
    )}
  </div>
</header>