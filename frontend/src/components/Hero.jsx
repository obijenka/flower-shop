import { Link } from "react-router-dom";
import Container from "./ui/Container";

import heroDiscounts from "../assets/hero/hero-discounts.jpg";
import heroRoses from "../assets/hero/hero-roses.png";
import heroGifts from "../assets/hero/hero-gifts.png";
import heroBaskets from "../assets/hero/hero-baskets.png";
import heroFlowersInBox from "../assets/hero/hero-flowers-in-box.png";

function Tile({ to, imgSrc, label }) {
  return (
    <div
      className={`hidden md:block bg-cover bg-center relative`}
      style={{ backgroundImage: `url(${imgSrc})` }}
    >
      <Link to={to} className="absolute inset-0 flex flex-col items-start justify-start p-4">
        <div className="text-2xl lg:text-4xl">
          {label}
        </div>
      </Link>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="py-6">
      <Container>
        <div className="h-[60vh]">
          <div className="grid h-full grid-cols-2 grid-rows-2 gap-4 md:grid-cols-4 md:grid-rows-2 font-bold leading-tight">
            
            {/* Большая плитка */}
            <div
              className="col-span-2 row-span-2 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${heroDiscounts})` }}
            >
              <Link
                to="/sales"
                className="absolute inset-0 flex flex-col items-end justify-start p-4"
              >
                <div className="text-2xl sm:text-4xl">
                  Скидки <span className="text-white">-6%</span> на все
                  <br />
                  букеты <span className="text-white">по предзаказу</span>
                  <br />
                  на 8 марта
                </div>
              </Link>
            </div>

            {/* Маленькие плитки */}
            <Tile to="/catalog/roses" imgSrc={heroRoses} label="Розы" />
            <Tile to="/gifts" imgSrc={heroGifts} label="Подарки" />
            <Tile 
              to="/gift-baskets" 
              imgSrc={heroBaskets} 
              label={
                <>
                  Подарочные <br /> корзины
                </>
              } 
            />
            <Tile 
              to="/flowers-in-box" 
              imgSrc={heroFlowersInBox} 
              label={
                <>
                  Цветы в <br /> коробке
                </>
              } 
            />
          </div>
        </div>
      </Container>
    </section>
  );
}