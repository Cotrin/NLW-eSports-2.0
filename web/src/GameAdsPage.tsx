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
  game: Game
  id: string
  name: string
  weekDays: string[]
  useVoiceChannel: boolean
  yearsPlaying: number
  hourStart: string
  hourEnd: string
}

function GameAdsPage() {
  const { gameTitle } = useParams()

  const [ads, setAds] = useState<Ads[]>([])

  const game = ads[0]?.game
  if (game) {
    game.adsCount = ads.length
  }

  function convertToReadableWeekDays(array: string[]) {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

    const convertedArray = array.map(dayNumber => days[Number(dayNumber)])

    return convertedArray
  }

  useEffect(() => {
    async function getGameAds() {
      const { data: gameAds } = await axios.get(`http://localhost:3333/games/${gameTitle}/ads`)

      setAds(gameAds)
    }

    getGameAds()
  }, [])

  if (!game) {
    return <CircleNotch size={32} className={'animate-spin text-violet-400  mx-auto mt-96'} />
  }

  return (
    <div className="text-white text-xl">
      <Header game={game} />

      <div className="flex flex-wrap px-16 gap-8 mt-16">
        {ads.map(ad => (
          <div className="flex flex-col items-center w-[320px] bg-[#2A2634] rounded-lg text-white text-xl p-">
            <div className="w-auto">
              <label htmlFor="name">Player ID:</label>
              <div id="name">{ad.name}</div>
            </div>

            <div>
              <label htmlFor="yearsPlaying">Experiência:</label>
              <div id="yearsPlaying">{`${ad.yearsPlaying} anos`}</div>
            </div>

            <div>
              <label htmlFor="">Disponibilidade:</label>
              <div>
                <label htmlFor="">Dias</label>
                <ul className='grid grid-cols-3 gap-3'>
                  {convertToReadableWeekDays(ad.weekDays).map(day => (
                    <li className='bg-violet-600 rounded-lg p-1 text-center'>{day}</li>
                  ))}
                </ul>
              </div>
              <div>
                <label htmlFor="">Horário:</label>
                <div>{`${ad.hourStart} até ${ad.hourEnd}`}</div>
              </div>

              <div className="flex gap-3">
                <label>Discord:</label>
                <strong className={`${ad.useVoiceChannel ? 'text-green-600' : 'text-red-600'}`}>{`${
                  ad.useVoiceChannel ? 'Sim' : 'Não'
                }`}</strong>
              </div>

              <div>
                <button
                  className=" py-3 px-4 bg-violet-500 text-white rounded-md hover:bg-violet-600 hover:cursor-pointer flex items-center gap-3 disabled:brightness-75 disabled:bg-gray-500 disabled:cursor-not-allowed"
                  disabled={!ad.useVoiceChannel}
                >
                  Ver discord id
                </button>
              </div>
            </div>

            {/* {JSON.stringify(ad, null, 2)} */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GameAdsPage
