import { MdOutlineAttachMoney } from "react-icons/md"
import ChartDashboard from "../../component/ChartDashboard"
import CusomterTableMainDashboard from "../../component/CusomterTableMainDashboard"
import ChartCricleDashboard from "../../component/ChartDashboardCricle"
// import CardDashboard from "../../component/CardDashboard"


const MainDashboar = () => {

    return (
        <div className="mt-5">
{/*                 <div className="flex gap-4 justify-center lg:justify-around flex-wrap">
                    <CardDashboard header="Total Sales" icon={<MdOutlineAttachMoney className="text-lg"/>} ratio={3.2} quantity={240000}/>
                    <CardDashboard header="Total Orders" icon={<MdOutlineAttachMoney className="text-lg"/>} ratio={12.2} quantity={300}/>
                    <CardDashboard header="Customers" icon={<MdOutlineAttachMoney className="text-lg"/>} ratio={13.2} quantity={50}/>
                </div> */}
                <div className="min-h-[430px] bg-white mt-5 rounded-2xl">
                    <h2 className='text-xl font-semibold ml-4 pt-4'>Report</h2>
                    <ChartDashboard/>
                </div>
                <div className="min-h-[430px] bg-white mt-5 rounded-2xl">
                    <h2 className='text-xl font-semibold ml-4 pt-4'>Product && Customer</h2>
                    <div className="flex justify-center lg:justify-between gap-y-10 items-center px-3 gap-3 flex-wrap">
                        <ChartCricleDashboard/>
                        <CusomterTableMainDashboard/>
                    </div>
                </div>
        </div>
    )
}

export default MainDashboar
