import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Legend, Cell, ResponsiveContainer } from 'recharts';


const ChartEventGenre = ({ events }) => {
  const [data, setData] = useState([]);
  const colors = ['#8884D8', '#48e5b6', '#F88181', '#FAAFA9', '#65AFD1'];

  useEffect(() => {

    const getData = () => {
      const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
      let data = genres.map((genre) => {
        let value = events.filter(event => event.summary.split(/[\W]+/).includes(genre)).length;
        if (genre === 'AngularJS') { value += events.filter(event => event.summary.split(' ').includes('Angular')).length; }
        if (value > 0) {
          return { name: genre, value };
        }
      });
      //delete undefined elements
      data = data.filter(element => {
        return element !== undefined;
      });
      return data;
    };

    setData(() => getData());
  }, [events]);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveContainer height="100%">
        <PieChart >
          <Pie
            data={data}
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            // label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
            label={renderCustomizedLabel}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))
            }

          </Pie>
          <Legend verticalAlign="top" height={0} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}


export default ChartEventGenre;