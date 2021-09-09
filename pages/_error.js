import Layout from "../components/Layout"

function Error({ statusCode }) {
  return (
    <Layout title={`Error ${statusCode}`}>
      <div className="flex flex-col justify-center items-center mt-16">
        <p
          className="text-blue text-center text-8xl tracking-widest md:text-left p-0 filter drop-shadow-text-drop"
          style={{
            fontFamily: `"Abril Fatface", cursive`,
            // fontSize: "12rem",
          }}
        >
          {statusCode}
        </p>
        <p
          className="tracking-widest text-xl md:text-5xl p-3 text-brown "
          style={{ fontFamily: `"Fredoka One", cursive` }}
        >
          GO HOME, YOU'RE LOST
        </p>
        <p style={{ fontFamily: "Merriweather" }}>
          An Error occured during access this link, try to go home
        </p>
        <button
          style={{ fontFamily: `"Fredoka One", cursive` }}
          className="px-5 py-3 my-3 bg-blue text-pink tracking-wider rounded-xl transform hover:scale-105 hover:bg-brown transition ease-in-out duration-500"
        >
          <a>GO HOME</a>
        </button>
      </div>
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = err ? err.statusCode : 404
  return { statusCode }
}

export default Error
