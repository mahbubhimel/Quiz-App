import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Signup from "./pages/Signup";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/*" element={<PublicRoute />}>
              <Route path="signup" element={<Signup />}></Route>
              <Route path="login" element={<Login />}></Route>
            </Route>
            <Route path="/*" element={<PrivateRoute />}>
              <Route path="quiz/:id" element={<Quiz></Quiz>}></Route>
              <Route path="result/:id" element={<Result></Result>}></Route>
            </Route>
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
