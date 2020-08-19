import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import Test6 from './components/Test6';
import { ITest6Props,ChartDatas } from './components/ITest6Props';
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';



export interface ITest6WebPartProps {
  description: string;
}

export interface spListItems{
  value: spListItem[];
}
export interface spListItem{
OData__x5165__x793e__x65e5_: string;//入社日
}

export default class Test6WebPart extends BaseClientSideWebPart<ITest6WebPartProps> {

  public render(): void {
    this.GetListData().then((response)=>{
      let datas : ChartDatas = this.MakeChartData(response.value);
      let ResultData : ChartDatas = datas;
    const element: React.ReactElement<ITest6Props> = React.createElement(
      Test6,
      {
        ResultData: ResultData
      }
    );
    ReactDom.render(element, this.domElement);
  });
  }

  private GetListData(): Promise<spListItems> {
      return this.context.spHttpClient.get(`https://androbocs333.sharepoint.com/sites/ARGorganizationtable/_api/web/lists/getbytitle('全エンジニアリスト')/items?$top=1000`,SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse)=>{
         return response.json();
      });
    }
  private MakeChartData (items: spListItem[]): ChartDatas{
    var year_count: {[name: number] : number} = {};
    let date_data = new Date();
    let y_now : number = date_data.getFullYear();
    var data : {year:string,男性:number,女性:number}[] = [];

    items.forEach((item: spListItem) => {
      var sex = Math.floor(Math.random()*2);//性別を0,1で判別
      let item_year = item.OData__x5165__x793e__x65e5_;
      if (item_year == null){
        item_year = '';
      }else{
        let y = (item_year.split('-')[0]);

        if(year_count[y]){
          year_count[y] = year_count[y] + 1;
          for(var i in data) {
            if (data[i].year == y){
              if (sex == 0){
                data[i].男性 = data[i].男性 + 1;
              }else{
                data[i].女性 = data[i].女性 + 1;
              }
            }
          }
        }else{
            year_count[y] = 1;
            if (sex == 0){
              data.push({year:y,男性:1,女性:0});
            }else{
              data.push({year:y,男性:0,女性:1});
            }
          }
      }

    });
    // console.log(data);
    // data = data.sort(function(a,b){
    //   if( a.year < b.year ) return -1;
    //   if( a.year > b.year ) return 1;
    //   return 0;
    // });
    // data = [
    //   {year:2015,男性:3,女性:5},
    //   {year:2016,男性:6,女性:6},
    //   {year:2017,男性:6,女性:6},
    //   {year:2018,男性:6,女性:6},
    //   {year:2019,男性:20,女性:30},
    //   {year:2020,男性:30,女性:20}

    // ];

    //  data = [
    //   { year: '1', 男性: 10, 女性: 1 },
    //   { year: '2', 男性: 12, 女性: 4 },
    //   { year: '3', 男性: 18, 女性: 8 },
    //   { year: '4', 男性: 10, 女性: 0 },
    //   { year: '5', 男性: 9, 女性: 1 },
    //   { year: '6', 男性: 13, 女性: 2 },
    //   { year: '7', 男性: 16, 女性: 5 },
    // ];
    

    // console.log(data);
    return {
      data
    };
  }

  
}
