import AppHeader from "./components/AppHeader/AppHeader";
import PageContent from "./components/PageContent/PageContent";
import AppFooter from "./components/AppFooter/AppFooter";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./redux-store/auth-slice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    const expirationTime = localStorage.getItem("expirationTime") || 0;
    dispatch(
      authActions.login({
        token: token,
        expirationTime: expirationTime,
      })
    );
  }, [dispatch]);
  return (
    <div className="App">
      <AppHeader />
      <PageContent />
      <AppFooter />
    </div>
  );
}

export default App;
