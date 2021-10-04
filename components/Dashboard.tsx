import React, { CSSProperties } from "react"
import Vector from "@svg/Vector 1.svg"
import SearchBox from "components/utils/SearchBox"

const SVGStyle: CSSProperties = { zIndex: -10 }

const Dashboard: React.FC = () => {
  return (
    <section className="w-full text-white flex relative md:py-16 md:px-24 md:h-screen ">
      <Vector
        className="absolute hidden md:block right-0 -bottom-7"
        style={SVGStyle}
      />
      <div className="flex flex-col mx-3 md:mx-0 md:w-3/5 md:items-start">
        <div className="flex md:w-10/12 my-3 w-full">
          <div className="hidden md:block w-10 bg-gradient-to-br from-gold-light to-gold mr-5"></div>
          <h1 className="md:text-7xl text-3xl font-bold md:leading-tight  ">
            Create <span className="text-gold-light">Elegant</span> Gift For
            Your Beloved One
          </h1>
        </div>
        <p className="font-light w-full md:w-10/12 text-sm my-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non
          felis lobortis tellus mattis fringilla. Donec luctus metus quis lectus
          mattis condimentum. In lorem quam, pellentesque eu orci sed,
          sollicitudin consequat turpis. Integer posuere tempus pellentesque.
          Nulla pulvinar
        </p>
        <div className="flex my-3">
          <DashboardBtn className="bg-gradient-to-r from-gold-light to-gold text-black">
            Create Now
          </DashboardBtn>
          <DashboardBtn className="bg-gradient-to-br from-black-light to-black text-gold-medium">
            Contact Us
          </DashboardBtn>
        </div>
      </div>
      <div className="hidden md:block"></div>
    </section>
  )
}

interface DashboardBtnProps {
  className: string
}

const DashboardBtn: React.FC<DashboardBtnProps> = ({ children, className }) => {
  return (
    <button
      className={`py-3 px-10 md:px-14 mr-6 rounded-lg font-bold transition-all ease-in-out text-sm md:text-base active:scale-105  ${
        className && className
      }`}
    >
      {children}
    </button>
  )
}

export default Dashboard
