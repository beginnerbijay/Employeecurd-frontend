import {useState} from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import {Routes,Route} from 'react-router-dom'
import Adduser from './components/Adduser'
import Edit from './components/Edit'
import User from './components/User'
import Login from './components/Login'
import { UserContext } from './Context'

function App() {
  const [show, setshow] = useState(false);
  return (
    <UserContext.Provider value={{show,setshow}}>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/adduser' element={<Adduser/>}/>
      <Route exact path='/edit/:id' element={<Edit/>}/>
      <Route exact path='/user/:id' element={<User/>}/>
      <Route exact path='/login' element={<Login/>}/>
    </Routes>
    </UserContext.Provider>
  )
}

export default App
