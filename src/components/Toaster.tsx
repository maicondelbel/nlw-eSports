import * as Toast from '@radix-ui/react-toast'

import { X } from 'phosphor-react'
import { SetStateAction } from 'react'
import { IToaster } from '../App'
import { ToasterType } from './Toaster/ToasterType'

interface IToasterProps {
  toaster: IToaster
  setToaster: (data: SetStateAction<IToaster>) => void
}

export function Toaster({ toaster, setToaster }: IToasterProps) {
  function handleCloseToaster(event: boolean) {
    setToaster((state) => ({
      ...state,
      openIt: event,
    }))
  }
  return (
    <Toast.Provider>
      <Toast.Root
        open={toaster.openIt}
        onOpenChange={handleCloseToaster}
        duration={4000}
        className="bg-[#2a2634] rounded-lg py-4 px-6 relative toaster-open:animate-slideIn toaster-closed:animate-swipeOut max-w-[300px]"
      >
        <Toast.Description className="flex flex-row gap-3 justify-center items-center">
          <ToasterType success={toaster.success} message={toaster.message} />
        </Toast.Description>
        <Toast.Close className="absolute top-1 right-1 p-1">
          <X size={12} className="text-zinc-200" />
        </Toast.Close>
      </Toast.Root>

      <Toast.Viewport className="fixed m-0 p-6 top-0 right-0 flex list-none z-50" />
    </Toast.Provider>
  )
}
