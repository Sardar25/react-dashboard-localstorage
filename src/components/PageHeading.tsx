import { BiArrowBack } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

const PageHeading = ({ text, backButton=false }: { text : string, backButton?:boolean }) => {

    const navigate = useNavigate();

  return (
    <div className="flex   items-center gap-4">

    { backButton && <button onClick={()=> navigate(-1)}  className="cursor-pointer mt-[6px]">
    <BiArrowBack size={30}/>
    </button> }
    <p className="text-4xl font-semibold text-black/70 ">
        { text }
    </p>

    </div>

  )
}

export default PageHeading