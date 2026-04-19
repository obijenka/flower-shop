import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AuthCallbackHandler from './components/auth/AuthCallbackHandler.js'
import VerifyCodeModal from './components/auth/VerifyCodeModal'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/verify" element={<VerifyCodeModal />} />
        <Route path="/auth/callback" element={<AuthCallbackHandler />} />
      </Routes>
    </Layout>
  )
}