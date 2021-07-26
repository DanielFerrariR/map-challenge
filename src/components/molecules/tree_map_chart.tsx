import React from 'react'
import { useSelector } from 'src/store'
import ApexCharts from 'apexcharts'
import { Box } from 'src/components/atoms'

const TreeMapChart = () => {
  const [onlyOnce, setOnlyOnce] = React.useState(false)
  const places = useSelector((state) => state.places)
  const data = places.map((place) => ({
    x: place.name,
    y: place.population
  }))
  const options = React.useMemo(
    () => ({
      series: [
        {
          data
        }
      ],
      legend: {
        show: false
      },
      chart: {
        height: '50%',
        type: 'treemap'
      },
      title: {
        text: 'Country Population Chart'
      }
    }),
    [data]
  )

  React.useEffect(() => {
    if (onlyOnce) return
    if (!places.some((e) => e)) return
    const chart = new ApexCharts(document.querySelector('#chart'), options)
    chart.render()
    setOnlyOnce(true)
  }, [onlyOnce, options, places])

  return places.some((e) => e) ? <Box id="chart" /> : null
}

export default React.memo(TreeMapChart)
