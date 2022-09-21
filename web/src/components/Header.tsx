import logoImg from '../assets/logo-nlw-esports.svg'

interface HeaderProps {
  game: {
    title: string
    bannerUrl: string
    adsCount: number
  }
}

export function Header(props: HeaderProps) {
  return (
    <div className="container mx-auto flex justify-between items-center p-12 mt-4">
      <div className="flex items-center gap-9">
        <div className="w-52">
          <img className="rounded-xl" src={props.game.bannerUrl} alt="" />
        </div>
        <div className="">
          <strong className="text-4xl text-white font-black block mb-4">{props.game.title}</strong>
          <span className="text-zinc-400 block">
            {`${props.game.adsCount} player(s) a procura de duo(s)`}
          </span>
        </div>
      </div>

      <div className='flex items-center'>
        <img src={logoImg} alt="" />
      </div>
    </div>
  )
}
