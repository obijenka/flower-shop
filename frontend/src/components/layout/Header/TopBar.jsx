import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'
import Container from '../../ui/Container'
import { HiOutlineHeart, HiOutlineTruck, HiOutlinePhone, HiOutlineUser, HiOutlineMenu } from 'react-icons/hi'

export default function TopBar({
  currencies,
  languages,
  cities,
  selectedCurrency,
  selectedLanguage,
  selectedCity,
  onSelectCurrency,
  onSelectLanguage,
  onSelectCity,
  isAuthenticated,
  user,
  onLogout,
  onOpenAuth,
  onOpenMobileMenu,
}) {
  return (
    <div className="bg-custom-dark py-4 sticky top-0 z-10 text-white md:text-base">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex gap-[20px] xl:gap-[60px] items-center">
            <Dropdown
              label={<span className="hidden md:inline">Валюта</span>}
              options={currencies}
              selected={selectedCurrency}
              onSelect={onSelectCurrency}
            />
            <Dropdown
              label={<span className="hidden md:inline">Язык</span>}
              options={languages}
              selected={selectedLanguage}
              onSelect={onSelectLanguage}
            />
            <Dropdown
              label={<span className="hidden md:inline">Город</span>}
              options={cities}
              selected={selectedCity}
              onSelect={onSelectCity}
            />

            {/* Ссылки с иконками */}
            <Link to="/favorites" className="hidden lg:flex items-center gap-3 hover:text-gray-300">
              <HiOutlineHeart size={22} className="text-custom-purple" />
              <span>Закладки</span>
            </Link>

            <Link to="/delivery" className="hidden lg:flex items-center gap-3 hover:text-gray-300">
              <HiOutlineTruck size={22} className="text-custom-purple" />
              <span>Доставка и оплата</span>
            </Link>

            <Link to="/contacts" className="hidden lg:flex items-center gap-3 hover:text-gray-300">
              <HiOutlinePhone size={22} className="text-custom-purple" />
              <span>Контакты</span>
            </Link>
          </div>

          {/* Вход | Регистрация и Меню */}

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="hidden lg:block text-white">{user?.name || user?.email}</div>
                <button type="button" onClick={onLogout} className="hidden lg:block hover:text-gray-300">
                  Выход
                </button>
                <button
                  type="button"
                  onClick={onLogout}
                  aria-label="Выйти"
                  className="lg:hidden hover:text-gray-300"
                >
                  <HiOutlineUser size={22} className="text-custom-purple" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenAuth}
                className="flex items-center gap-3 hover:text-gray-300"
              >
                <HiOutlineUser size={22} className="text-custom-purple" />
                <span className="hidden lg:inline">Вход | Регистрация</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenMobileMenu}
              aria-label="Открыть меню"
              className="hover:text-gray-300 lg:hidden"
            >
              <HiOutlineMenu size={24} />
            </button>
          </div>
        </div>
      </Container>
    </div>
  )
}
