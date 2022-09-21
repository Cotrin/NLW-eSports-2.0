import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Header } from './components/Header'

import axios from 'axios'

import { CircleNotch } from 'phosphor-react'

interface Game {
  title: string
  bannerUrl: string
  adsCount: number
}

interface Ads {
  game: Game,
  id: string,
  name: string,
  weekDays: string[],
  useVoiceChannel:boolean,
  yearsPlaying:  number,
  hourStart: string,
  hourEnd: string
}

function GameAdsPage() {
  const { gameTitle } = useParams()

  const [ads, setAds] = useState<Ads[]>([])

  const game = ads[0]?.game
  if (game) {
    game.adsCount = ads.length
  }

  useEffect(() => {
    async function getGameAds() {
      const { data: gameAds } = await axios.get(`http://localhost:3333/games/${gameTitle}/ads`)

      setAds(gameAds)
    }
    
    getGameAds()
  }, [])

  if (!game) {
    return (
      <CircleNotch size={32} className={'animate-spin text-violet-400  mx-auto mt-96'} />
    )
  }

  return (
    <div className="text-white text-xl">
      
      <Header game={game}/>

    
      <div className="flex flex-col gap-8 mt-16">
        {ads.map(ad => (
          <div className="text-white text-xl">{JSON.stringify(ad, null, 2)}</div>
        ))}
      </div>
    </div>
  )
}

export default GameAdsPage
