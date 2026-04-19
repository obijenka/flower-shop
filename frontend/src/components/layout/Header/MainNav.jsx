import { Link } from 'react-router-dom'
import Container from '../../ui/Container'
import {
  HiOutlineChevronDown,
  HiOutlineHeart,
  HiOutlineSearch,
  HiOutlineShoppingBag,
} from 'react-icons/hi'
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaViber } from 'react-icons/fa'

export default function MainNav() {
  return (
    <div className="py-6">
      <Container>
        <div className="flex items-center justify-between lg:hidden mb-6">
          <div className="w-[80px] h-[80px] flex-shrink-0">
            <img src="/logo.png" alt="FlowerShop" className="w-full h-full object-contain" />
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
            <img src="/logo.png" alt="FlowerShop" className="w-full h-full object-contain" />
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
  )
}
