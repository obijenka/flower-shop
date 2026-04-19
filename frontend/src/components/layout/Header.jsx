import { Link } from "react-router-dom";
import Container from "../ui/Container";
import Dropdown from "../ui/Dropdown";
import { useState } from "react";
import AuthModal from "../auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/userSlice";
import {
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiOutlineTruck,
  HiOutlinePhone,
  HiOutlineUser,
  HiOutlineSearch,
  HiOutlineChevronDown,
  HiOutlineMenu,
  HiOutlineX,
} from "react-icons/hi";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaViber,
} from "react-icons/fa";

export default function Header() {
  const currencies = ["USD", "EUR", "UAH"];
  const languages = ["RU", "UA", "EN"];
  const cities = ["Киев", "Харьков", "Львов", "Одесса"];

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [selectedCurrency, setSelectedCurrency] = useState("UAH");
  const [selectedLanguage, setSelectedLanguage] = useState("RU");
  const [selectedCity, setSelectedCity] = useState("Киев");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <div className="bg-custom-dark py-4 sticky top-0 z-10 text-white md:text-base">
        <Container>
          <div className="flex justify-between items-center">
            <div className="flex gap-[20px] xl:gap-[60px] items-center">
              <Dropdown
                label={<span className="hidden md:inline">Валюта</span>}
                options={currencies}
                selected={selectedCurrency}
                onSelect={setSelectedCurrency}
              />
              <Dropdown
                label={<span className="hidden md:inline">Язык</span>}
                options={languages}
                selected={selectedLanguage}
                onSelect={setSelectedLanguage}
              />
              <Dropdown
                label={<span className="hidden md:inline">Город</span>}
                options={cities}
                selected={selectedCity}
                onSelect={setSelectedCity}
              />

              {/* Ссылки с иконками */}
              <Link
                to="/favorites"
                className="hidden lg:flex items-center gap-3 hover:text-gray-300"
              >
                <HiOutlineHeart size={22} className="text-custom-purple" />
                <span>Закладки</span>
              </Link>

              <Link
                to="/delivery"
                className="hidden lg:flex items-center gap-3 hover:text-gray-300"
              >
                <HiOutlineTruck size={22} className="text-custom-purple" />
                <span>Доставка и оплата</span>
              </Link>

              <Link
                to="/contacts"
                className="hidden lg:flex items-center gap-3 hover:text-gray-300"
              >
                <HiOutlinePhone size={22} className="text-custom-purple" />
                <span>Контакты</span>
              </Link>
            </div>

            {/* Вход | Регистрация и Меню */}

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <div className="hidden lg:block text-white">
                    {user?.name || user?.email}
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="hidden lg:block hover:text-gray-300"
                  >
                    Выход
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    aria-label="Выйти"
                    className="lg:hidden hover:text-gray-300"
                  >
                    <HiOutlineUser size={22} className="text-custom-purple" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAuthOpen(true)}
                  className="flex items-center gap-3 hover:text-gray-300"
                >
                  <HiOutlineUser size={22} className="text-custom-purple" />
                  <span className="hidden lg:inline">Вход | Регистрация</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Открыть меню"
                className="hover:text-gray-300 lg:hidden"
              >
                <HiOutlineMenu size={24} />
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Мобильное меню */}
      <div
        className={`${isMobileMenuOpen ? "block" : "hidden"} lg:hidden fixed inset-0 z-50`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="absolute right-0 top-0 h-full w-[85%] max-w-[360px] bg-white text-custom-dark shadow-xl p-4 overflow-y-auto">
          <div className="flex items-center justify-between">
            <div className="w-[60px] h-[60px] flex-shrink-0">
              <img
                src="/logo.png"
                alt="FlowerShop"
                className="w-full h-full object-contain"
              />
            </div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Закрыть меню"
              className="p-2"
            >
              <HiOutlineX size={22} />
            </button>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Dropdown
                label="Валюта"
                options={currencies}
                selected={selectedCurrency}
                onSelect={setSelectedCurrency}
              />
              <Dropdown
                label="Язык"
                options={languages}
                selected={selectedLanguage}
                onSelect={setSelectedLanguage}
              />
              <Dropdown
                label="Город"
                options={cities}
                selected={selectedCity}
                onSelect={setSelectedCity}
              />
            </div>

            <div className="h-px bg-gray-200" />

            <nav className="flex flex-col gap-3 font-semibold">
              <button className="flex items-center gap-2" type="button">
                <span className="text-custom-purple">Каталог товаров</span>
                <HiOutlineChevronDown size={14} />
              </button>
              <Link
                to="/forum"
                className="text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Форум
              </Link>
              <Link
                to="/reviews"
                className="text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Отзывы
              </Link>
              <Link
                to="/sales"
                className="text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Акции
              </Link>
              <Link
                to="/news"
                className="text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Новости
              </Link>
              <button
                className="flex items-center gap-2 text-gray-700"
                type="button"
              >
                <span>Информация</span>
                <HiOutlineChevronDown size={14} />
              </button>
            </nav>

            <div className="h-px bg-gray-200" />

            <div className="flex flex-col gap-3">
              <Link
                to="/favorites"
                className="flex items-center gap-3 text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <HiOutlineHeart size={22} className="text-custom-purple" />
                <span>Закладки</span>
              </Link>
              <Link
                to="/delivery"
                className="flex items-center gap-3 text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <HiOutlineTruck size={22} className="text-custom-purple" />
                <span>Доставка и оплата</span>
              </Link>
              <Link
                to="/contacts"
                className="flex items-center gap-3 text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <HiOutlinePhone size={22} className="text-custom-purple" />
                <span>Контакты</span>
              </Link>
            </div>

            <div className="h-px bg-gray-200" />

            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-custom-purple flex items-center justify-center text-white"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-custom-purple flex items-center justify-center text-white"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-custom-purple flex items-center justify-center text-white"
              >
                <FaTelegramPlane size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-custom-purple flex items-center justify-center text-white"
              >
                <FaViber size={14} />
              </a>
            </div>

            <div>
              <a href="tel:+380000000000" className="text-gray-700">
                +38 (067) 829 30 30
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6">
        <Container>
          <div className="flex items-center justify-between lg:hidden mb-6">
            <div className="w-[80px] h-[80px] flex-shrink-0">
              <img
                src="/logo.png"
                alt="FlowerShop"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex gap-5 text-custom-purple">
              <Link to="/favorites" className="relative">
                <HiOutlineHeart size={28} />
                <span className="absolute top-0 -right-2 bg-custom-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link to="/cart" className="relative">
                <HiOutlineShoppingBag size={28} />
                <span className="absolute top-0 -right-2 bg-custom-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="hidden lg:block w-[120px] h-[120px] flex-shrink-0">
              <img
                src="/logo.png"
                alt="FlowerShop"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Центральный блок с поиском */}
            <div className="flex flex-col gap-8 lg:gap-12 w-full lg:flex-1 lg:max-w-[800px]">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <div className="w-full sm:w-[220px] text-gray-400 border-b border-custom-purple pb-1">
                  <button className="flex items-center gap-2 text-sm">
                    <HiOutlineChevronDown size={14} />
                    <span>Поиск по категориям</span>
                  </button>
                </div>

                <div className="flex justify-between flex-1 border-b border-custom-purple pb-1">
                  <input
                    type="text"
                    placeholder="Поиск по товарам"
                    className="w-full text-gray-400 placeholder-gray-400 text-sm focus:outline-none"
                  />
                  <button>
                    <HiOutlineSearch size={20} className="text-custom-purple" />
                  </button>
                </div>
              </div>

              <div className="hidden lg:flex justify-between font-bold">
                <button className="flex items-center gap-2">
                  <span className="text-custom-purple">Каталог товаров</span>
                  <HiOutlineChevronDown size={14} />
                </button>
                <Link to="/forum" className="text-gray-700">
                  Форум
                </Link>
                <Link to="/reviews" className="text-gray-700">
                  Отзывы
                </Link>
                <Link to="/sales" className="text-gray-700">
                  Акции
                </Link>
                <Link to="/news" className="text-gray-700">
                  Новости
                </Link>
                <button className="flex items-center gap-2 text-gray-700">
                  <span>Информация</span>
                  <HiOutlineChevronDown size={14} />
                </button>
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-end gap-5 flex-shrink-0">
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-custom-purple flex items-center justify-center text-white"
                >
                  <FaFacebookF size={14} />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-custom-purple flex items-center justify-center text-white"
                >
                  <FaInstagram size={14} />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-custom-purple flex items-center justify-center text-white"
                >
                  <FaTelegramPlane size={14} />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-custom-purple flex items-center justify-center text-white"
                >
                  <FaViber size={14} />
                </a>
              </div>

              <a href="tel:+380000000000" className="text-gray-700">
                +38 (067) 829 30 30
              </a>

              <div className="flex gap-5 text-custom-purple">
                <Link to="/favorites" className="relative">
                  <HiOutlineHeart size={32} />
                  <span className="absolute -top-2 -right-2 bg-custom-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </Link>
                <Link to="/cart" className="relative">
                  <HiOutlineShoppingBag size={32} />
                  <span className="absolute -top-2 -right-2 bg-custom-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} defaultMode="login" />
    </header>
  );
}
