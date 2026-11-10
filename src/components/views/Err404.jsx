import { Link } from "react-router-dom"


export default function Err404(){

 return(
  <>
      <div className="flex flex-col items-center justify-center bg-gray-900 text-white h-screen">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl">Página no encontrada</p>
        <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Inicio
        </Link>
      </div>
  </>
 )
}