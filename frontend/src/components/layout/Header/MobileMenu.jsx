import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'
import {
  HiOutlineChevronDown,
  HiOutlineHeart,
  HiOutlinePhone,
  HiOutlineTruck,
  HiOutlineX,
} from 'react-icons/hi'
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaViber } from 'react-icons/fa'

export default function MobileMenu({
  isOpen,
  onClose,
  currencies,
  languages,
  cities,
  selectedCurrency,
  selectedLanguage,
  selectedCity,
  onSelectCurrency,
  onSelectLanguage,
  onSelectCity,
}) {
  return (
    <div
      className={`${isOpen ? 'block' : 'hidden'} lg:hidden fixed inset-0 z-50`}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-[85%] max-w-[360px] bg-white text-custom-dark shadow-xl p-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="w-[60px] h-[60px] flex-shrink-0">
            <img src="/logo.png" alt="FlowerShop" className="w-full h-full object-contain" />
          </div>
          <button type="button" onClick={onClose} aria-label="Закрыть меню" className="p-2">
            <HiOutlineX size={22} />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <Dropdown
              label="Валюта"
              options={currencies}
              selected={selectedCurrency}
              onSelect={onSelectCurrency}
            />
            <Dropdown
              label="Язык"
              options={languages}
              selected={selectedLanguage}
              onSelect={onSelectLanguage}
            />
            <Dropdown
              label="Город"
              options={cities}
              selected={selectedCity}
              onSelect={onSelectCity}
            />
          </div>

          <div className="h-px bg-gray-200" />

          <nav className="flex flex-col gap-3 font-semibold">
            <button className="flex items-center gap-2" type="button">
              <span className="text-custom-purple">Каталог товаров</span>
              <HiOutlineChevronDown size={14} />
            </button>
            <Link to="/forum" className="text-gray-700" onClick={onClose}>
              Форум
            </Link>
            <Link to="/reviews" className="text-gray-700" onClick={onClose}>
              Отзывы
            </Link>
            <Link to="/sales" className="text-gray-700" onClick={onClose}>
              Акции
            </Link>
            <Link to="/news" className="text-gray-700" onClick={onClose}>
              Новости
            </Link>
            <button className="flex items-center gap-2 text-gray-700" type="button">
              <span>Информация</span>
              <HiOutlineChevronDown size={14} />
            </button>
          </nav>

          <div className="h-px bg-gray-200" />

          <div className="flex flex-col gap-3">
            <Link to="/favorites" className="flex items-center gap-3 text-gray-700" onClick={onClose}>
              <HiOutlineHeart size={22} className="text-custom-purple" />
              <span>Закладки</span>
            </Link>
            <Link to="/delivery" className="flex items-center gap-3 text-gray-700" onClick={onClose}>
              <HiOutlineTruck size={22} className="text-custom-purple" />
              <span>Доставка и оплата</span>
            </Link>
            <Link to="/contacts" className="flex items-center gap-3 text-gray-700" onClick={onClose}>
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
  )
}
