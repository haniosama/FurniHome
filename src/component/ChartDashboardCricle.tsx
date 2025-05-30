import { ResponsivePie } from '@nivo/pie'
import type { IProduct } from '../interfaces/productsDashbord';


const ChartCricleDashboard = ({products}:{products:IProduct[]}) => {
  
  const data = products?.map((item, index) => ({
    id: item.title.split(" ").slice(0,2).join(" "),
    label: item.title.split(" ").slice(0,2).join(" "),
    value: item.quantity,
    color: `hsl(${(index * 50) % 360}, 70%, 50%)` 
  }));
  return (
    <div className="h-[400px]  scrollable-x overflow-y-hidden ">
      {products?.length>0?
      <div className="w-[600px] h-full">
      <ResponsivePie /* or Pie for fixed dimensions */
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.6}
          cornerRadius={2}
          activeOuterRadiusOffset={8}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          legends={[
              {
                  anchor: 'bottom',
                  direction: 'row',
                  translateY: 56,
                  itemWidth: 100,
                  itemHeight: 18,
                  symbolShape: 'circle'
              }
          ]}
      />
        </div>
      :
      null
    }
      </div>

  )
}

export default ChartCricleDashboard
