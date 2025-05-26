import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/loginPage/LoginPage";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import { fetchUserInfo } from "./store/userSlice";


function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo());
    }
  }, [token, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />

      <Route element={<ProtectedRoute onlyGuest />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
