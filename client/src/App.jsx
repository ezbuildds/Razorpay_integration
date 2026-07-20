
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './component/navbar/Navbar'
import Plans from './component/Plan'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Plans/>}/>
        {/* <Route path='subcription' element={<Profile />}/> */}
      </Routes>
    </>
  )
}

export default App
