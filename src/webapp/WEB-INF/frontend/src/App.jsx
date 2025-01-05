import './App.css'
import FooterComponent from './components/Footer'
import HeaderComponent from './components/Header'
import ListPatientComponent from './components/ListPatient'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PatientComponent from './components/Patient'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
          <div>
            <Routes>
              {/* http://localhost:8080 */}
              <Route path='/' element = { <ListPatientComponent /> } />
              {/* http://localhost:8080/patients */}
              <Route path='/patients' element = { <ListPatientComponent /> } />
              {/* http://localhost:8080/add-patient */}
              <Route path='/add-patient' element = { <PatientComponent /> } />
              {/* http://localhost:8080/edit-patient/1 */}
              <Route path='/edit-patient/:id' element = { <PatientComponent /> } />
            </Routes>
          </div>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
