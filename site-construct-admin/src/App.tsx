import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/loginPage/LoginPage";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import { fetchUserInfo } from "./store/userSlice";
import UsersPage from "./pages/usersPage/UsersPage";
import UserPage from "./pages/userPage/UserPage";
import { logout } from "./store/authSlice";
import CharPage from "./pages/charPage/CharPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import DocPage from "./pages/docPage/DocPage";


function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
    
  const { user_type } = useAppSelector((state) => state.user);
  console.log(user_type);

  useEffect(() => {
    if (user_type && user_type !== 'Администратор') {
      dispatch(logout());
    }
  })

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo());
    }
  }, [token, dispatch]);

  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={['Администратор']} />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/characteristics" element={<CharPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/documents" element={<DocPage />} />
      </Route>

      <Route element={<ProtectedRoute onlyGuest />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
