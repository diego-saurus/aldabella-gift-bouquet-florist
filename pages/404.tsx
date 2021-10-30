import { NextPage } from "next"
import Link from "next/link"

import Layout from "components/Layout"
import Ellipse from "svg/404 ellipse.svg"
import Mountain from "svg/mountain.svg"
import MountainDesk from "svg/mountain_desktop.svg"

const ErrorNotFound: NextPage = () => {
  return (
    <Layout title="404">
      <div className="centering overflow-x-hidden mt-36 flex flex-col items-center justify-between h-110 text-gold-lightest">
        <div className="flex flex-col items-center z-10">
          <h1 className="text-8xl md:text-[9.5rem] font-bold text-white flex items-center justify-between">
            4{<Ellipse className="inline w-18 md:w-24 mx-3 md:mx-5" />}4
          </h1>
          <p className="font-bold text-xl md:text-4xl text-center">
            You look like a little lost...
          </p>
        </div>
        <Link href="/">
          <button className="py-2 px-14 z-10 bg-gold-lightest font-bold text-xl rounded-full text-black">
            <a> Get me out of here</a>
          </button>
        </Link>
      </div>
      <Mountain className="absolute z-0 -bottom-10 md:hidden" />
      <MountainDesk className="absolute z-0 -bottom-10 hidden md:block" />
    </Layout>
  )
}

export default ErrorNotFound
