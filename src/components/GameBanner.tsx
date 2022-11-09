import 'swiper/css'
import 'swiper/css/pagination'

import * as Dialog from '@radix-ui/react-dialog'

import { SetStateAction, useState } from 'react'
import { IToaster } from '../App'
import { ShowAdModal } from './ShowAdModal'
import { X } from 'phosphor-react'
import { isPlural } from '../utils/isPlural'

import axios from 'axios'

interface IGameBannerProps {
  gameId: string
  bannerUrl: string
  gameTitle: string
  adsCount: number
  setToaster: (data: SetStateAction<IToaster>) => void
}

export interface IAds {
  hourEnd: string
  hourStart: string
  id: string
  name: string
  useVoiceChannel: boolean
  weekDays: number[]
  yearsPlaying: number
}

export function GameBanner({
  gameId,
  adsCount,
  bannerUrl,
  gameTitle,
  setToaster,
}: IGameBannerProps) {
  const [ads, setAds] = useState<IAds[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)

  function getGameAds() {
    axios(`${import.meta.env.VITE_API_HOST}/games/${gameId}/ads`)
      .then((response) => {
        setAds(response.data)
        setOpenModal(true)
      })
      .catch((e) => {
        setToaster((prevState) => ({
          ...prevState,
          openIt: true,
          success: false,
          message: 'Erro ao encontrar os anúncios do game selecionado!',
        }))
        setOpenModal(false)
        console.log(e)
      })
  }
  return (
    <Dialog.Root open={openModal}>
      <Dialog.Trigger
        onClick={(event) => {
          if (adsCount > 0) {
            getGameAds()
          } else {
            event.preventDefault()
          }
        }}
        className={adsCount === 0 ? 'pointer-events-none' : 'cursor-pointer'}
      >
        <div className="relative rounded-lg overflow-hidden leading-none">
          <img src={bannerUrl} alt="" className="w-full" />
          <div className="w-full pt-16 pb-4 px-4 bg-game-overlay absolute bottom-0 left-0 right-0 text-left">
            <strong className="font-bold text-white block">{gameTitle}</strong>
            <span className="text-sm text-zinc-300 block mt-1">
              {`${adsCount} anúncio${isPlural(adsCount)}`}
            </span>
          </div>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed grid place-items-center z-10">
          <Dialog.Content
            className="w-400 bg-[#2A2634] p-6 md:px-10 md:py-8 rounded-md w-[350px] md:w-[450px] relative"
            onPointerDownOutside={() => setOpenModal(false)}
          >
            <div className="flex gap-5 items-end">
              <div className="h-[125px] md:h-[150px] rounded-lg flex overflow-hidden">
                <img src={bannerUrl} alt="" className="w-full" />
              </div>
              <div className="flex flex-col flex-1">
                <strong className="text-white font-black text-2xl">
                  {gameTitle}
                </strong>
                <span className="text-zinc-400">{`${adsCount} anúncio${isPlural(
                  adsCount,
                )}`}</span>
              </div>
            </div>
            <div className="my-5">
              <span className="text-zinc-400 text-lg md:text-xl">
                Conecte-se e comece a jogar!
              </span>
            </div>
            <div>
              <ShowAdModal ads={ads} setToaster={setToaster} />
            </div>
            <Dialog.Close
              className="absolute top-0 right-0"
              onClick={() => setOpenModal(false)}
            >
              <X className="text-zinc-400 w-6 h-6 m-4" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
