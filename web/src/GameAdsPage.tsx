import { useParams } from 'react-router-dom'

function GameAdsPage() {
  const { gameTitle } = useParams()

  return <div className="w-full h-full text-white text-xl">Games Ad Page! Game: {gameTitle}</div>
}

export default GameAdsPage
