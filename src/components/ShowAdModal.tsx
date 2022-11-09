import 'swiper/css'
import 'swiper/css/pagination'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import { IAds } from './GameBanner'
import { DiscordLogo } from 'phosphor-react'
import { SetStateAction, useState } from 'react'
import { IToaster } from '../App'
import { isPlural } from '../utils/isPlural'

import axios from 'axios'

interface IShowAdModalProps {
  ads: IAds[]
  setToaster: (data: SetStateAction<IToaster>) => void
}

interface ISelectedAd {
  selectedId: string
  discord: string
}

export function ShowAdModal({ ads, setToaster }: IShowAdModalProps) {
  const [selectAd, setSelectAd] = useState<ISelectedAd>()

  function getDiscord(selectedId: string) {
    axios(`${import.meta.env.VITE_API_HOST}/ads/${selectedId}/discord`)
      .then((response) => {
        setSelectAd({ selectedId, discord: response.data.discord })
        if (window.isSecureContext) {
          navigator.clipboard.writeText(response.data.discord)
        }
        setToaster((prevState) => ({
          ...prevState,
          openIt: true,
          success: true,
          message: 'Discord copiado para a área de transferência com sucesso',
        }))
      })
      .catch((e) => {
        setToaster((prevState) => ({
          ...prevState,
          openIt: true,
          success: false,
          message: 'Erro ao encontrar o Discord do anúncio selecionado!',
        }))
        console.log(e)
      })
  }
  return (
    <Swiper
      pagination={true}
      spaceBetween={15}
      slidesPerView={ads.length > 1 ? 1.1 : 1}
      grabCursor={true}
      modules={[Pagination]}
    >
      {ads.map((ad) => {
        return (
          <SwiperSlide key={ad.id} className="pb-6">
            <div className="pt-1 bg-nlw-gradient rounded-lg overflow-hidden">
              <div className="bg-zinc-900 text-white p-6 rounded-lg flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-zinc-500 text-sm md:text-base">
                    Nome
                  </span>
                  <strong className="whitespace-nowrap text-sm md:text-base overflow-hidden overflow-ellipsis">
                    {ad.name}
                  </strong>
                </div>
                <div className="flex flex-col">
                  <span className="text-zinc-500 text-sm md:text-base">
                    Tempo de Jogo
                  </span>
                  <strong className="text-sm md:text-base">{`${
                    ad.yearsPlaying
                  } ano${isPlural(ad.yearsPlaying)}`}</strong>
                </div>
                <div className="flex flex-col">
                  <span className="text-zinc-500 text-sm md:text-base">
                    Disponibilidade
                  </span>
                  <strong className="text-sm md:text-base">
                    {`${ad.weekDays.length} dia${isPlural(
                      ad.weekDays.length,
                    )} \u2022 ${ad.hourStart}h - ${ad.hourEnd}h`}
                  </strong>
                </div>
                <div className="flex flex-col">
                  <span className="text-zinc-500 text-sm md:text-base">
                    Chamada de áudio?
                  </span>
                  <strong>
                    {ad.useVoiceChannel ? (
                      <span className="text-emerald-500 text-sm md:text-base">
                        Sim
                      </span>
                    ) : (
                      <span className="text-red-400 text-sm md:text-base">
                        Não
                      </span>
                    )}
                  </strong>
                </div>
                <button
                  onClick={() => getDiscord(ad.id)}
                  className="mt-4 px-4 py-3 bg-violet-500 flex items-center font-semibold text-sm justify-center gap-3 text-white rounded-md hover:bg-violet-600"
                >
                  <DiscordLogo size={20} />
                  {selectAd?.selectedId === ad.id
                    ? `${selectAd.discord}`
                    : 'Copiar Discord'}
                </button>
              </div>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
