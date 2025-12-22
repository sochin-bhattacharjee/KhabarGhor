import {Navigate, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import { ThreeCircles } from 'react-loader-spinner'
import useGetCity from './hooks/useGetCity'
export const serverUrl = import.meta.env.VITE_SERVER_URL
function App() {
  
  useGetCurrentUser()
  useGetCity()

  const {userData, loading} = useSelector(state=>state.user)
  // loader
  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
              <ThreeCircles
                visible={loading}
                height="30"
                width="30"
                color="orange"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
            </div>
    )
  }

  return (
    <Routes>
      <Route path='/' element={userData ? <Home/>:<Navigate to={"/signin"} />}/>
      <Route path='/signup' element={!userData ? <SignUp/> : <Navigate to={"/"}/>}/>
      <Route path='/signin' element={!userData ? <SignIn/> : <Navigate to={"/"}/>}/>
      <Route path='/forgot-password' element={!userData ? <ForgotPassword/> : <Navigate to={"/"}/>}/>
    </Routes>
  )
}

export default App
