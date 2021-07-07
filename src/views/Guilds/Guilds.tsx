import React from 'react'
import { useParams } from 'react-router-dom'
import NotFound from 'views/NotFound'
import Troll from './Troll/Troll'

const Guilds: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const guild = () => {
    switch (slug) {
      case 'troll':
        return <Troll guildSlug={slug} />
      default:
        return <NotFound />
    }
  }
  return guild()
}
export default Guilds
