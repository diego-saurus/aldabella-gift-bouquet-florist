import ArrowIcon from "./svg/north_east_black_24dp.svg"

function Main() {
  return (
    <div className="flex justify-between">
      <div className="md:max-w-4xl flex flex-col items-center md:items-start">
        <p
          style={{ fontFamily: `"Abril Fatface", cursive` }}
          className="text-blue text-6xl text-center tracking-wide md:text-left md:text-8xl md:leading-snug"
        >
          Create Elegant Gift For Your <span>Beloved</span> one
        </p>
        <p
          style={{ fontFamily: "Merriweather" }}
          className="text-blue my-5 text-sm w-3/4 text-center md:w-8/12 md:text-left md:text-md md:leading-loose "
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro error
          soluta fuga iusto quo nam molestias, ducimus excepturi earum?
        </p>
        <a
          className="flex text-brown items-center underline md:text-2xl"
          style={{ fontFamily: `"Abril Fatface", cursive` }}
          href="#"
        >
          Create Gift Now
          <ArrowIcon className="fill-current text-brown" />
        </a>
      </div>
      <div className="hidden md:block"></div>
    </div>
  )
}

export default Main
