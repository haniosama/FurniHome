import type { JSX } from "react"

interface props{
    header:string,
    icon:JSX.Element,
    ratio:number,
    quantity:number
}

const CardDashboard = ({header,icon,ratio,quantity}:props) => {
  return (
    <div className="w-[300px]  bg-white p-3 rounded-xl items-center h-[150px] transition-all duration-300 hover:scale-105">
        <div className="flex justify-between items-center">
            <p className="text-lg font-medium text-gray-600">{header}</p>
            <div className="bg-gray-200/70 p-2 rounded-full">
                {icon}
            </div>
        </div>
        <div className="px-2 py-1 bg-[#3d5f9e38] inline-block text-[#3d5f9e] rounded-3xl font-semibold my-3">{ratio}%</div>
        <p className="text-2xl scale-x-110 translate-x-5 font-semibold">${(quantity).toLocaleString('en-US',{minimumFractionDigits: 2, maximumFractionDigits: 2,})}</p>
    </div>
  )
}

export default CardDashboard
