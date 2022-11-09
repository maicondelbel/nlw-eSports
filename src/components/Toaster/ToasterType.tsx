import { CheckCircle, XCircle } from 'phosphor-react'

interface IToasterTypeProps {
  success: boolean
  message: string
}

export function ToasterType({ success, message }: IToasterTypeProps) {
  return (
    <>
      <div>
        {success ? (
          <CheckCircle size={48} className="text-emerald-500" />
        ) : (
          <XCircle size={48} className="text-red-500" />
        )}
      </div>
      <div className="flex flex-col gap-1 pr-1">
        <strong className="text-white">
          {success ? 'Sucesso !' : 'Erro !'}
        </strong>
        <span className="text-zinc-200 text-xs">{message}</span>
      </div>
    </>
  )
}
