import Register from "./Register.jsx";
import Login from "./Login.jsx";
import SidebarNavigation from "./SidebarNavigation.jsx";
function Main({
  isRegisterVisible,
  isLoginVisible,
  setIsRegisterVisible,
  setIsLoginVisible,
}) {
  return (
    <main
      style={{
        height: "100vh", // full viewport height
        width: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        position: "absolute",
        top: 101,
      }}
    >
      <div
        style={{
          width: "180px",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SidebarNavigation />
      </div>
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
