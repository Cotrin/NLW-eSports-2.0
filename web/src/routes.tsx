import { Route } from 'react-router-dom'

import App from './App'
import GameAdsPage from './GameAdsPage'

export const routes = (
  <>
    <Route path="/" element={<App />} />
    <Route path="games/:gameTitle" element={<GameAdsPage />} />
  </>
)
