import React, { Component } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


class Charts extends Component {

  handleChartClick = (city) => {
    const location = this.props.locations.find((location) => {
      return location.toUpperCase().indexOf(city.toUpperCase()) > -1;
    });
    alert('You clicked city ' + city + " location = " + location);
    this.props.updateEvents(location);
    this.props.handleQueryChange(location);
  }


  render() {
    let data = this.props.getData();

    return (

      <ResponsiveContainer height={400} >
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" name="Location" />
          <YAxis width={30} allowDecimals={false} />
          <Bar dataKey="number" fill="#8884d8"
            onClick={(undefined, index) => this.handleChartClick(data[index].city)}
          />
        </BarChart>
      </ResponsiveContainer>

    )
  }

}


export default Charts;