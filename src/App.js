import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Slide, ToastContainer } from "react-toastify"
import Dashboard from "./components/Dashboard"
import NotFound from "./components/NotFound"

const App = () =>  (
    <BrowserRouter>
      <ToastContainer position="top-center" hideProgressBar={true} autoClose={600} transition={Slide}/>
      <Routes>
        <Route exact path="/" element={<Dashboard />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )


export default App