import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'

import { GameBanner } from './GameBanner'
import { Game } from '../App'

interface CarouselProps {
  games: Game[]
}

export function Carousel({ games }: CarouselProps) {
  return (
    <div className="max-w-[1344px] mt-16">
      <Swiper spaceBetween={50} slidesPerView={3} navigation modules={[Navigation]}>
        {games.map(game => {
          return (
            <SwiperSlide
              key={game.id}
              className="overflow-hidden rounded-lg max-w-[13rem] hover:shadow-violet-800 hover:shadow-lg"
            >
              <GameBanner
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.ads}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
