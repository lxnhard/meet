import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        {payload[0].payload.city}: {payload[0].payload.number}
      </div>
    );
  }
  return null;
};

const CustomizedAxisTick = ({ x, y, stroke, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dx={-2} dy={3} textAnchor="end" fill="#666" fontSize="14" transform="rotate(-90)">
        {payload.value}
      </text>
    </g >
  );
}

class ChartCity extends Component {

  handleChartClick = (city) => {
    const location = this.props.locations.find((location) => {
      return location.toUpperCase().indexOf(city.toUpperCase()) > -1;
    });
    this.props.updateEvents(location);
    this.props.handleQueryChange(location);
  }

  render() {
    let data = this.props.data;

    return (

      <ResponsiveContainer height={400} >
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 60,
          }}
        >
          <XAxis dataKey="city" name="Location" interval={0} tick={<CustomizedAxisTick />} />
          <YAxis width={30} allowDecimals={false} />
          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{ backgroundColor: 'white', outline: 'none' }}
            cursor={{ fill: '#e6ebed' }} />
          <Bar dataKey="number" fill="#8884D8"
            onClick={(undefined, index) => this.handleChartClick(data[index].city)} />
        </BarChart>
      </ResponsiveContainer>

    )
  }

}


export default ChartCity;