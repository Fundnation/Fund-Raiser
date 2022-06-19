import React  from "react";
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import { Authenticate, ProfileStep1,ProfileStep2,ProfileStep3,ProfileStep4,ProfileStep5,ProfileStep6 } from "./components";
import {CreateProject, LandingPage, Signin, SingleDonation, ProfileInfo} from './Pages/index'

const App = () => {
  return (
    <Router>
      <Routes>
          <Route  index path='/' element={<LandingPage/>}/>
          <Route  index path='signin' element={<Signin/>}/>
          <Route  index path='/donation/:id' element={<SingleDonation/>}/>
          <Route  index path='/projects' element={<CreateProject/>}/>
          <Route  index path ='/authenticate' element={<Authenticate/>}/>
          <Route exact={true} path='/profile' element={<ProfileInfo/>}>
            <Route index path='step1' element={<ProfileStep1/>}/>
            <Route index path="step2" element={<ProfileStep2/>}/>
            <Route index path="step3" element={<ProfileStep3/>}/>
            <Route index path="step4" element={<ProfileStep4/>}/>
            <Route index path="step5" element={<ProfileStep5/>}/>
            <Route index path="step6" element={<ProfileStep6/>}/>
          </Route>
      </Routes>
    </Router>
  )
}
export default App
