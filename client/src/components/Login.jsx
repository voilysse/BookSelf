function Login({ setIsLoginVisible }) {
  return (
    <>
      <div className="Register">
        <div className="Container">
          <div className="CloseButton">
            <button onClick={() => setIsLoginVisible(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <img className="Logo" src="/images/logo.png" alt="Bookself Logo" />
          <div className="Title">
            <h1 className="Typewriter Twelve">Welcome back</h1>
            <div className="ParagraphContainer">
              <p className="SmallGrey" style={{ marginRight: "20px" }}>
                Continue exploring the vast world of literature
              </p>
            </div>
          </div>
          <div className="Form">
            <h2>Email</h2>
            <input className="Input" type="email"></input>
            <h2>Password</h2>
            <input className="Input" type="password"></input>
          </div>
          <button className="OrangeButton">Log in</button>
          <div className="textSeparator">
            <hr className="separator" />
          </div>
          <p className="SmallGrey">Forgot your password?</p>
        </div>
      </div>
    </>
  );
}

export default Login;
