import { CircleNotch } from 'phosphor-react'

export function Loader() {
  return (
    <div className="text-white flex justify-center h-[250px] items-center">
      <CircleNotch size={48}>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from="0 0 0"
          to="360 0 0"
          repeatCount="indefinite"
        ></animateTransform>
      </CircleNotch>
    </div>
  )
}
