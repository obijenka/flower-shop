import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AuthModal from '../../auth/AuthModal'
import { logout } from '../../../store/slices/userSlice'
import MobileMenu from './MobileMenu'
import TopBar from './TopBar'
import MainNav from './MainNav'

export default function Header() {
  const currencies = ['USD', 'EUR', 'UAH']
  const languages = ['RU', 'UA', 'EN']
  const cities = ['Киев', 'Харьков', 'Львов', 'Одесса']

  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state) => state.user)

  const [selectedCurrency, setSelectedCurrency] = useState('UAH')
  const [selectedLanguage, setSelectedLanguage] = useState('RU')
  const [selectedCity, setSelectedCity] = useState('Киев')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header>
      <TopBar
        currencies={currencies}
        languages={languages}
        cities={cities}
        selectedCurrency={selectedCurrency}
        selectedLanguage={selectedLanguage}
        selectedCity={selectedCity}
        onSelectCurrency={setSelectedCurrency}
        onSelectLanguage={setSelectedLanguage}
        onSelectCity={setSelectedCity}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currencies={currencies}
        languages={languages}
        cities={cities}
        selectedCurrency={selectedCurrency}
        selectedLanguage={selectedLanguage}
        selectedCity={selectedCity}
        onSelectCurrency={setSelectedCurrency}
        onSelectLanguage={setSelectedLanguage}
        onSelectCity={setSelectedCity}
      />

      <MainNav />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} defaultMode="login" />
    </header>
  )
}
