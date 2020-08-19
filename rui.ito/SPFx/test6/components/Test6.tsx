import * as React from 'react';
import styles from './Test6.module.scss';
import { ITest6Props } from './ITest6Props';

import {BarChart, 
  ResponsiveContainer, LineChart,Legend,Line,
  Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip}
  from 'recharts';


export default class Test6 extends React.Component<ITest6Props, {}> {
  public render(): React.ReactElement<ITest6Props> {
    // const data2 = [
    //   { year: 1, 男性: 10, 女性: 1 },
    //   { year: 2, 男性: 12, 女性: 4 },
    //   { year: 3, 男性: 18, 女性: 8 },
    //   { year: 4, 男性: 10, 女性: 0 },
    //   { year: 5, 男性: 9, 女性: 1 },
    //   { year: 6, 男性: 13, 女性: 2 },
    //   { year: 7, 男性: 16, 女性: 3 },
    // ];
    // console.log(data2);
    console.log(this.props.ResultData);
    
    const data2 = this.props.ResultData.data;
    console.log(data2);

  return (  
      <div>
           
            <BarChart
                width={700}
                height={500}
                data={data2}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" interval="preserveStartEnd" />
                <YAxis interval="preserveStartEnd" />
                <Legend />
                <Tooltip // ツールチップの表示
                labelFormatter={this.props.ResultData.data['year']}
                />
                <Bar  dataKey="男性" fill="#8884d8" />
                <Bar  dataKey="女性" fill="#82ca9d" />
            </BarChart>
        
      </div>
       
    );
  }
}

/* <BarChart
            data={this.props.ResultData.data}
            margin={{top: 5, right: 50, left: 50, bottom: 25}}
            width="95%">
          <XAxis
            dataKey="year"
            unit="年"
          />
          <YAxis
            domain={['dataMin', 'dataMax']}
            ticks={[0,5,10,15,20,25,30]} // Y軸に表示する数値
            unit="人" // Y軸の単位
          />
          <CartesianGrid // ガイド線の表示
            stroke="#ccc"
            strokeDasharray="3 3"
          />
          <Tooltip // ツールチップの表示
            // labelFormatter={this.props.ResultData.data}
          />
          <Bar　// 男性のデータを表示
            name="男性"
            dataKey="男性"// this.props.data のキー
            fill="salmon"// 線の色
            unit="人" //単位
          />
          <Bar　// 女性のデータを表示
            name="女性"
            dataKey="女性"// this.props.data のキー
            fill="skyblue"// 線の色
            unit="人" //単位
          />
        </BarChart> */
