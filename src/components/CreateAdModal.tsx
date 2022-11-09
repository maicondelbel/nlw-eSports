import * as Checkbox from '@radix-ui/react-checkbox'
import * as Dialog from '@radix-ui/react-dialog'
import * as Select from '@radix-ui/react-select'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { CaretDown, CaretUp, Check, GameController } from 'phosphor-react'
import { Input } from './Form/Input'
import { useForm, Controller } from 'react-hook-form'
import { CSSProperties, SetStateAction } from 'react'
import { IGames, IToaster } from '../App'
import axios from 'axios'

interface ICreateAdModalProps {
  games: IGames[]
  setToaster: (data: SetStateAction<IToaster>) => void
  setOpenModal: (open: SetStateAction<boolean>) => void
}

interface IFormData {
  game: string
  name: string
  yearsPlaying: number
  discord: string
  weekDays: string[]
  hourStart: string
  hourEnd: string
  useVoiceChannel: any
}

export function CreateAdModal({
  games,
  setOpenModal,
  setToaster,
}: ICreateAdModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormData>()

  function successCreatingAdToaster() {
    setToaster((prevState) => ({
      ...prevState,
      openIt: true,
      success: true,
      message: 'Anúncio criado com sucesso!',
    }))
  }

  function errorCreatingAdToaster() {
    setToaster((prevState) => ({
      ...prevState,
      openIt: true,
      success: false,
      message: 'Erro ao criar o anúncio!',
    }))
  }

  function onSubmit(data: IFormData) {
    axios
      .post(`${import.meta.env.VITE_API_HOST}/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: data.weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: !!data.useVoiceChannel,
      })
      .then((response) => {
        console.log('Form enviado com sucesso!', response)
        successCreatingAdToaster()
        setOpenModal(false)
        reset()
      })
      .catch((error) => {
        console.log('Erro ao enviar o fomulário', error)
        errorCreatingAdToaster()
        setOpenModal(false)
        reset()
      })
  }

  const halfWidth: CSSProperties = {
    width: '50%',
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed grid place-items-center overflow-y-auto z-10">
        <Dialog.Content
          onPointerDownOutside={(event) => {
            event.preventDefault()
          }}
          className="bg-[#2A2634] fixed py-6 md:py-8 px-6 md:px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-black/25 overflow-y-auto"
        >
          <Dialog.Title className="text-xl md:text-3xl font-black">
            Publique um anúncio
          </Dialog.Title>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 md:mt-8 flex flex-col gap-2 md:gap-4"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="game"
                className="text-sm md:text-base block font-semibold"
              >
                Qual o game?
              </label>
              <Controller
                rules={{ required: true }}
                name="game"
                control={control}
                render={({ field }) => (
                  <Select.Root name="game" onValueChange={field.onChange}>
                    <Select.Trigger
                      className={`bg-zinc-900 py-2 md:py-3 px-4 rounded text-sm flex text-zinc-500 justify-between items-center border border-transparent ${
                        errors.game ? 'border border-red-500' : ''
                      }`}
                    >
                      <Select.Value placeholder="Selecione o game que deseja jogar" />
                      <Select.Icon>
                        <CaretDown className="w-5 h-5 md:h-6 md:w-6" />
                      </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content className="bg-zinc-900 text-zinc-500 rounded text-sm leading-8 overflow-hidden z-20">
                        <Select.ScrollUpButton className="flex justify-center py-1">
                          <CaretUp className="w-5 h-5 md:h-6 md:w-6" />
                        </Select.ScrollUpButton>
                        <Select.Viewport>
                          {games.map((game) => {
                            return (
                              <Select.Item
                                key={game.id}
                                value={game.id}
                                className="highlighted:bg-violet-500 highlighted:text-white py-2 md:py-3 px-4 text-sm flex justify-between"
                              >
                                <Select.ItemText>{game.title}</Select.ItemText>
                                <Select.ItemIndicator>
                                  <Check />
                                </Select.ItemIndicator>
                              </Select.Item>
                            )
                          })}
                        </Select.Viewport>
                        <Select.ScrollDownButton className="flex justify-center py-1">
                          <CaretDown className="w-5 h-5 md:h-6 md:w-6" />
                        </Select.ScrollDownButton>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm md:text-base font-semibold"
              >
                Seu nome (ou nickname)
              </label>
              <Input
                {...register('name', { required: true })}
                placeholder="Como te chamam dentro do game"
                hasError={!!errors.name}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4">
              <div className="flex flex-col gap-2 basis-1/2">
                <label
                  htmlFor="yearsPlaying"
                  className="text-sm md:text-base font-semibold"
                >
                  Joga a quantos anos?
                </label>
                <Input
                  {...register('yearsPlaying', { required: true })}
                  type="number"
                  placeholder="Tudo bem ser ZERO"
                  hasError={!!errors.yearsPlaying}
                />
              </div>
              <div className="flex flex-col gap-2 basis-1/2">
                <label
                  htmlFor="discord"
                  className="text-sm md:text-base font-semibold"
                >
                  Qual seu Discord?
                </label>
                <Input
                  {...register('discord', { required: true })}
                  type="text"
                  placeholder="Usuario#1234"
                  hasError={!!errors.discord}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="weekDays"
                  className="text-sm md:text-base font-semibold"
                >
                  Quando costuma jogar?
                </label>
                <Controller
                  rules={{ required: true }}
                  name="weekDays"
                  control={control}
                  render={({ field }) => (
                    <ToggleGroup.Root
                      {...field}
                      type="multiple"
                      value={undefined}
                      onValueChange={field.onChange}
                      className={`flex gap-1 border border-transparent ${
                        errors.weekDays ? 'border border-red-500' : ''
                      }`}
                    >
                      <ToggleGroup.Item
                        value="0"
                        className="w-10 h-10 md:w-11 md:h-11 rounded bg-zinc-900  state:bg-violet-500"
                        title="Domingo"
                      >
                        D
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="1"
                        className="w-10 h-10 md:w-11 md:h-11 rounded bg-zinc-900  state:bg-violet-500"
                        title="Segunda"
                      >
                        S
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="2"
                        className="w-10 h-10 md:w-11 md:h-11 rounded bg-zinc-900  state:bg-violet-500"
                        title="Terça"
                      >
                        T
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="3"
                        className="w-10 h-10 md:w-11 md:h-11 rounded bg-zinc-900  state:bg-violet-500"
                        title="Quarta"
                      >
                        Q
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="4"
                        className="w-10 h-10 md:w-11 md:h-11 rounded bg-zinc-900  state:bg-violet-500"
                        title="Quinta"
                      >
                        Q
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="5"
                        className="w-10 h-10 md:w-11 md:h-11 rounded bg-zinc-900  state:bg-violet-500"
                        title="Sexta"
                      >
                        S
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="6"
                        className="w-10 h-10 md:w-11 md:h-11 rounded bg-zinc-900  state:bg-violet-500"
                        title="Sábado"
                      >
                        S
                      </ToggleGroup.Item>
                    </ToggleGroup.Root>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="weekDays"
                  className="text-sm md:text-base font-semibold"
                >
                  Qual horário do dia?
                </label>
                <div className="flex justify-between gap-2 flex-1">
                  <Input
                    {...register('hourStart', { required: true })}
                    type="time"
                    placeholder="De"
                    hasError={!!errors.hourStart}
                    style={halfWidth}
                  />
                  <Input
                    {...register('hourEnd', { required: true })}
                    type="time"
                    placeholder="Até"
                    hasError={!!errors.hourEnd}
                    style={halfWidth}
                  />
                </div>
              </div>
            </div>
            <label className="flex gap-2 mt-2 items-center text-sm md:text-base">
              <Controller
                name="useVoiceChannel"
                control={control}
                render={({ field }) => (
                  <Checkbox.Root
                    {...field}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="w-6 h-6 rounded bg-zinc-900 p-1"
                  >
                    <Checkbox.Indicator>
                      <Check className="h-4 w-4 text-emerald-400" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                )}
              />
              Costumo me conectar ao chat de voz
            </label>
            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close className="text-sm md:text-base px-4 py-3 md:px-5 md:py-3 bg-zinc-500 hover:bg-zinc-600 font-semibold rounded-md">
                Cancelar
              </Dialog.Close>
              <button
                type="submit"
                className="text-sm md:text-base px-4 py-3 md:px-5 md:py-3 bg-violet-500 hover:bg-violet-600 font-semibold rounded-md flex items-center gap-3"
              >
                <GameController className="text-xl md:text-2xl" /> Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  )
}
