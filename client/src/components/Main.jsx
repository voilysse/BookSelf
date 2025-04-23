import Register from "./Register.jsx";
import Login from "./Login.jsx";
function Main({
  isRegisterVisible,
  isLoginVisible,
  setIsRegisterVisible,
  setIsLoginVisible,
}) {
  return (
    <main>
      {isRegisterVisible && (
        <Register
          setIsRegisterVisible={setIsRegisterVisible}
          setIsLoginVisible={setIsLoginVisible}
        />
      )}
      {isLoginVisible && <Login setIsLoginVisible={setIsLoginVisible} />}
    </main>
  );
}
export default Main;
