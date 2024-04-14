import {Routes, Route } from "react-router-dom"
import IndexPage from "./pages/index-page"
import Login from "./pages/login"
import Register from "./pages/register"
import Dashboard from "./pages/dashboard"
import SingleCase from "./components/single-case"
import ViewReport from "./pages/view-report"
import Create from "./pages/create"
import CreateOfficer from "./pages/createOfficer"

const App = () => {
  return (
          <>
            <Routes>
              <Route  exact path='/' element={<IndexPage />} />
              <Route  path='/login' element={<Login />} />
              <Route  path='/register' element={<Register />} />
              <Route  path='/dashboard' element={<Dashboard />} />
              <Route  path='/dashboard/viewReport' element={<ViewReport />} />
              <Route  path='/dashboard/create' element={<Create />} />
              <Route  path='/dashboard/createOfficer' element={<CreateOfficer />} />
              <Route  path='/dashboard/case/:id' element={<SingleCase/>} />
            </Routes>
          </>
  )
}

export default App