
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './component/navbar/Navbar'
import Plans from './component/Plan'
import PaymentSuccess from './component/Pages/PaymentSuccess'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Plans />} />
        <Route path='/payment/success/:razorpayOrderId' element={<PaymentSuccess />} />
      </Routes>
    </>
  )
}

export default App
