import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import { Dashboard } from './pages/Dashboard';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { ProtectedRoute } from './components/ProtectedRoute';
import { EditTask } from './components/EditTask';
import { RootLayout } from './layout/RootLayout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><RootLayout /></ProtectedRoute>} >
            <Route index element={<Dashboard />} />
            <Route path="edit/:id" element={<EditTask />} />
          </Route>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App