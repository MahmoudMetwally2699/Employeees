import { createContext, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";
import MessagePopup from "./lib/MessagePopup";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Logout from "./component/Logout";
import Signup from "./component/Signup";
import Profile from "./component/Profile";
import Applications from "./component/Applications";
import AdminProfile from "./component/Admin/Profile";
import isAuth, { userType } from "./lib/isAuth";
import CreateJobs from "../src/component/Admin/CreateJobs";
import MyJobs from "./component/Admin/MyJobs";
import Home from "./component/Home";
import JobApplications from "./component/Admin/JobApplications";
import AcceptedApplicants from "./component/Admin/AcceptedApplicants";
import Welcome, { ErrorPage } from "./component/Welcome";
import { Sugar } from 'react-preloaders2';

const useStyles = makeStyles( ( theme ) => ( {
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "98vh",
    paddingTop: "64px",
    boxSizing: "border-box",
    width: "100%",
    backgroundColor: "#fefefe",
  },
}));

export const SetPopupContext = createContext();

function App() {
  const classes = useStyles();
  const [ popup, setPopup ] = useState( {
    open: false,
    severity: "",
    message: "",
  } );
  return (
    <BrowserRouter>
      <Sugar background=" linear-gradient(to right top, #051937, #004d7a, #00bf72, #a8eb12)" time={ 2000 } />
      <SetPopupContext.Provider value={ setPopup }>
        <Grid container direction="column">
          <Grid item xs>
            <Navbar id="navbar" />
          </Grid>
          <Grid item className={ classes.body }>
            <Switch>
              <Route exact path="/">
                <Welcome />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/logout">
                <Logout />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/profile">
                { userType() === "Admin" ? <AdminProfile /> : <Profile /> }
              </Route>
              <Route exact path="/addjob">
                <CreateJobs />
              </Route>
              <Route exact path="/myjobs">
                <MyJobs />
              </Route>
              <Route exact path="/job/applications/:jobId">
                <JobApplications />
              </Route>
              <Route exact path="/applications">
                <Applications />
              </Route>
              <Route exact path="/employees">
                <AcceptedApplicants />
              </Route>

              <ErrorPage />
            </Switch>
          </Grid>
        </Grid>
        <MessagePopup
          open={ popup.open }
          setOpen={ ( status ) =>
            setPopup({
              ...popup,
              open: status,
            })
          }
          severity={ popup.severity }
          message={ popup.message }
        />
      </SetPopupContext.Provider>
    </BrowserRouter>
  );
}

export default App;
