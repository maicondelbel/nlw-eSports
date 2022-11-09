/* eslint-disable react-hooks/exhaustive-deps */
import './styles/main.css'
import 'swiper/css'
import 'swiper/css/navigation'

import * as Dialog from '@radix-ui/react-dialog'

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { CreateAdModal } from './components/CreateAdModal'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useEffect, useState } from 'react'
import { Navigation } from 'swiper'
import { Toaster } from './components/Toaster'

import axios from 'axios'
import { Loader } from './components/Loader'

export interface IGames {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

export interface IToaster {
  openIt: boolean
  success: boolean
  message: string
}

export function App() {
  const [games, setGames] = useState<IGames[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)

  const [toaster, setToaster] = useState<IToaster>({
    openIt: false,
    success: false,
    message: '',
  })

  function errorFetchingGamesToaster() {
    setToaster({
      ...toaster,
      openIt: true,
      message: 'Falha ao encontrar os Games!',
    })
  }

  useEffect(() => {
    axios(`${import.meta.env.VITE_API_HOST}/games`)
      .then((response) => {
        setGames(response.data)
      })
      .catch(() => {
        errorFetchingGamesToaster()
      })
  }, [openModal])

  return (
    <div className="max-w-[1360px] mx-auto flex flex-col items-center my-20 px-5">
      <img src="images/logo.svg" alt="" />
      <h1 className="text-5xl md:text-6xl text-white font-black mt-20 text-center">
        Seu{' '}
        <span className="bg-nlw-gradient text-transparent bg-clip-text">
          duo
        </span>{' '}
        está aqui
      </h1>

      <div className="w-full mt-16">
        {games.length === 0 && <Loader />}
        <Swiper
          navigation={true}
          spaceBetween={15}
          slidesPerView={1.25}
          grabCursor={true}
          modules={[Navigation]}
          breakpoints={{
            '380': {
              slidesPerView: 2.25,
              spaceBetween: 15,
            },
            '576': {
              slidesPerView: 3.25,
              spaceBetween: 15,
            },
            '768': {
              slidesPerView: 4.25,
              spaceBetween: 25,
            },
            '992': {
              slidesPerView: 5.25,
              spaceBetween: 30,
            },
            '1200': {
              slidesPerView: 6.25,
              spaceBetween: 30,
            },
          }}
        >
          {games.map((game) => {
            return (
              <SwiperSlide key={game.id}>
                <GameBanner
                  gameId={game.id}
                  bannerUrl={game.bannerUrl}
                  adsCount={game._count.ads}
                  gameTitle={game.title}
                  setToaster={setToaster}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
      <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
        <CreateAdModal
          games={games}
          setOpenModal={setOpenModal}
          setToaster={setToaster}
        />
        <CreateAdBanner />
      </Dialog.Root>
      <Toaster toaster={toaster} setToaster={setToaster} />
    </div>
  )
}
