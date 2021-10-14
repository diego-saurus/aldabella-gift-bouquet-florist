import Layout from "components/Layout"
import Link from "next/link"
import Ellipse from "svg/404 ellipse.svg"
import Mountain from "svg/mountain.svg"
import { NextPage } from "next"

const ErrorNotFound: NextPage = () => {
  return (
    <Layout title="404">
      <div className="centering overflow-x-hidden mt-36 flex flex-col items-center justify-between h-110 text-gold-lightest">
        <div className="flex flex-col items-center z-10">
          <h1 className="text-8xl font-bold text-white flex items-center justify-between w-11/12">
            4{<Ellipse className="inline w-18" />}4
          </h1>
          <p className="font-bold text-xl text-center">
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
    </Layout>
  )
}

export default ErrorNotFound
