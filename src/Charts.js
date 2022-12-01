import React, { Component } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


class Charts extends Component {

  render() {

    return (
      // <ResponsiveContainer height={400} >
      //   <ScatterChart
      //     margin={{
      //       top: 20, right: 0, bottom: 20, left: 0,
      //     }}
      //   >
      //     <CartesianGrid />
      //     <XAxis type="category" dataKey="city" name="Location" />
      //     <YAxis type="number" dataKey="number" name="Number of events" allowDecimals={false} />
      //     <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      //     <Scatter data={this.props.getData()} fill="#8884d8" />
      //   </ScatterChart>
      // </ResponsiveContainer>

      <ResponsiveContainer height={400} >
        <BarChart
          data={this.props.getData()}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" name="Location" />
          <YAxis allowDecimals={false} />
          <Bar dataKey="number" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

    )
  }

}


export default Charts;