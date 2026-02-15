import "./App.css";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./pages/login";
import Register from "./components/Register";
import Attendance from "./components/attendance";

function Home() {
  return (
    <>
      <Register />
      <hr />
      <Attendance />
    </>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

function App() {
  return (
    <Router>
      <div className="page-container">
        <Header />

        <main className="content-wrap">
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/" component={Home} />
          </Switch>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
