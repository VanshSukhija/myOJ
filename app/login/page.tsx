import Image from "next/image"
import bgImage from "/public/abstractimage.jpg"
import Login from "@components/Login"

const page = () => {
  return (
    <div>
      <Image src={bgImage} alt="Abstract Background" fill={true} quality={100} className="" />
      <Login />
    </div>
  )
}

export default page
