import React from "react"

const Dashboard: React.FC = () => {
  return (
    <section className="text-white flex">
      <div className="w-full flex flex-col items-center md:w-3/5 md:items-start">
        <div className="flex text-5xl font-bold w-full md:text-7xl md:leading-tight">
          <div className="w-10 bg-gradient-to-br from-gold-light to-gold mr-5"></div>
          <h1>
            Create <span className="text-gold-light">Elegant</span> Gift For
            Your Beloved One
          </h1>
        </div>
        <p className="font-light w-10/12 my-7">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non
          felis lobortis tellus mattis fringilla. Donec luctus metus quis lectus
          mattis condimentum. In lorem quam, pellentesque eu orci sed,
          sollicitudin consequat turpis. Integer posuere tempus pellentesque.
          Nulla pulvinar
        </p>
        <div className="flex full my-5 ">
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
