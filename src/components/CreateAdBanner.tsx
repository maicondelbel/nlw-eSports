import * as Dialog from '@radix-ui/react-dialog'

import { MagnifyingGlassPlus } from 'phosphor-react'

export function CreateAdBanner() {
  return (
    <div className="mt-8 pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden">
      <div className="bg-[#2a2634] px-8 py-8 rounded-lg flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <strong className="text-2xl text-white block font-black">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        <Dialog.Trigger className="px-4 py-3 bg-violet-500 flex items-center gap-3 text-white rounded-md hover:bg-violet-600">
          <MagnifyingGlassPlus size={24} /> Publicar Anúncio
        </Dialog.Trigger>
      </div>
    </div>
  )
}
