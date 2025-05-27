import { ResponsiveLine } from '@nivo/line'
import { charData } from '../data/charData'



const ChartDashboard = () => {

  return (
    <div className="h-[400px]  scrollable-x overflow-y-hidden ">
      <div className="w-[950px] h-full">
        <ResponsiveLine 
          data={charData}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'seriesColor' }}
          pointLabelYOffset={-12}
          enableTouchCrosshair={true}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              translateX: 100,
              itemWidth: 80,
              itemHeight: 22,
              symbolShape: 'circle'
            }
          ]}
        />
      </div>
    </div>
  )
}

export default ChartDashboard
