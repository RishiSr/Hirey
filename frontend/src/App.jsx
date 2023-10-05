import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import Login from './screens/Login';
import Register from './screens/Register';
import HomeMng from './screens/HomeMng';
import Home from './screens/Home';
import CreateJobs from './screens/CreateJobs';
import Jobs from './screens/Jobs';
import MyJobs from './screens/MyJobs';
import Profile from './screens/Profile';
import CreateCompany from './screens/CreateCompany';
import { ToastContainer } from 'react-toastify';
import { MyContext } from './MyContext';
import EntryPage from './screens/EntryPage';
import RLogin from './screens/Recruiter/RLogin';
import RRegister from './screens/Recruiter/RRegister';
import Protect from './Protect';
import UpdateDetails from './screens/UpdateDetails';
import CreatedJobs from './screens/CreatedJobs';
import JobApplicants from './screens/JobApplicants';
import ElseRoute from './utils/ElseRoute';
import ApplicantsPage from './screens/ApplicantsPage';
import UpdateInfoUser from './screens/UpdateInfoUser';
import axios from 'axios';
import { errorToast, successToast } from './Toastify';
import { base_url } from './base_url';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userHRM")));

  const logoutUser = async () => {

    await axios.post(`${base_url}/users/logout`, {
      id: user.id || user._id,
      token: user.token
    }).then((res) => {
      console.log(res)


      successToast("Logged out");
      window.location.href = "/"
      localStorage.clear();
      setUser(null);

    }).catch((err) => {
      console.log(err);
      errorToast("Unable to logout");

    })





  }
  const logoutRecruiter = async () => {

    await axios.post(`${base_url}/recruiter/logout`, {
      id: user.id || user._id,
      token: user.token
    }).then((res) => {
      console.log(res)


      successToast("Logged out");
      // window.location.href = "/"
      // localStorage.clear();
      setUser(null);

    }).catch((err) => {
      console.log(err);
      errorToast("Unable to logout");

    })
  }

  const [hide, setHide] = useState(true)
  // useEffect(() => {
  //   if (user) {

  //     localStorage.setItem("userHRM", JSON.stringify(user));
  //   }

  // }, [user])

  console.log(user);

  // axios.interceptors.request.use(
  //   config => {
  //     console.log("rishi", config)
  //     if (user) {
  //       const { token } = user;
  //       if (token) {
  //         config.headers['Authorization'] = 'Bearer ' + token;
  //       }
  //     }

  //     // config.headers['Content-Type'] = 'application/json';
  //     return config
  //   },
  //   error => {
  //     Promise.reject(error)
  //   }
  // )
  // axios.interceptors.response.use((res) => {
  //   return res;
  // }, (err) => {

  //   console.log("interceptos", (err));
  //   if (err.response?.status == 401) {
  //     // setUser()
  //     errorToast("Unauthorised");
  //     if (user?.type == "seeker") {
  //       logoutUser();
  //     } else if (user?.type == "recruiter") {
  //       logoutRecruiter()
  //     } else {
  //       // window.location = "/"
  //     }


  //     // setUser(null);


  //   }
  //   return err
  // })
  return (<>
    <MyContext.Provider value={{ user, setUser, hide, setHide }}>
      <Router>
        <Routes>

          <Route path='/' element={<EntryPage />} />

          <Route path='login' element={<Login />} />

          <Route path='register' element={<Register />} />
          <Route path='add/info' element={<UpdateInfoUser />} />
          <Route path='home' element={user ? <HomeMng /> : <Protect />}>

            <Route path='all' element={<Home />} />
            {/* <Route path='home/jobs/:id' element={<Jobs />} /> */}



            <Route path='create' element={<CreateJobs />} />
            <Route path='createCompany' element={<CreateCompany />} />
            <Route path='jobs'>
              <Route path='' element={<MyJobs />} />

              <Route path=':id' element={<Jobs />} />
            </Route>
            <Route path='profile' element={<Profile />} />

            <Route path='settings' element={<UpdateDetails />} />
            {user?.type == "recruiter" && <Route path='jobs/my  '>
              <Route path='' element={<CreatedJobs />} />
              <Route path=':id' element={<JobApplicants />} />
              <Route path=':id/:sid' element={<ApplicantsPage />} />
            </Route>
            }
          </Route>

          <Route path='jobs/:id/share' element={<Jobs share />} />
          <Route path='recruiter' >
            <Route path='login' element={<RLogin />} />
            <Route path='register' element={<RRegister />} />

          </Route>
          {/* <Route path='*' element={<ElseRoute />} /> */}
        </Routes>
      </Router>
      <ToastContainer />
    </MyContext.Provider>
  </>


  )
}

export default App
