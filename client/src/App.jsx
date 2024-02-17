import Layout from "./components/Layout"
import { Route, Routes } from 'react-router-dom'
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Upload from "./pages/Upload"
import SearchContents from "./pages/SearchContents"
import ProfilePage from "./pages/ProfilePage"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/upload' element={<Upload />} />
        <Route path={`/search/:query`} element={<SearchContents/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </>
  )
}

export default App