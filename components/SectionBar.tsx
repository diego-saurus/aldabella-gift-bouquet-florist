import TimeSVG from "./svg/more_time_black_24dp.svg"
import MonetizationSVG from "./svg/monetization_on_black_24dp.svg"
import LocalShipSVG from "./svg/local_shipping_black_24dp.svg"
import React, { useRef } from "react"

interface itemT {
  text: string
  icon: any
}

const item: itemT[] = [
  {
    text: "Very fast work. We can create your order in 1 day in express",
    icon: TimeSVG,
  },
  {
    text: "Affordable Price for an elegant class",
    icon: MonetizationSVG,
  },
  {
    text: "Free local delivery for reasonable distance",
    icon: LocalShipSVG,
  },
]

const SectionBar: React.FC = () => {
  const divRef = useRef(null)
  return (
    <div className="bg-gradient-to-r from-gray" ref={divRef}>
      <div className="flex flex-col md:flex-row mx-0 md:mx-32 py-12 justify-between items-center">
        {item.map((m, i) => (
          <>
            <Item text={m.text} Icon={m.icon} key={i} />
          </>
        ))}
      </div>
    </div>
  )
}

interface ItemProps {
  text: string
  Icon: any
}

const Item: React.FC<ItemProps> = ({ Icon, text }) => {
  return (
    <div className="flex justify-start w-1/4 items-center">
      <Icon className="fill-current text-gold-medium h-10 w-1/4 text-opacity-100" />
      <p className="font-light text-sm text-opacity-80 text-white p-2 w-3/4">
        {text}
      </p>
    </div>
  )
}

export default SectionBar
