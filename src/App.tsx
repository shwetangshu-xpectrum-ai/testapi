import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import ApiDoc from './pages/ApiDoc'
import Home from './pages/Home'
import ErrorPage from './pages/ErrorPage'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/api-doc' Component={ApiDoc} />
          <Route path='*' Component={ErrorPage} />
        </Routes>
      </Router>
    </>
  )
}

export default App
