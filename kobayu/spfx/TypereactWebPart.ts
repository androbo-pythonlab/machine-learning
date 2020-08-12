import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import Typereact from './components/Typereact';
import { ITypereactProps, IChartData, standbynum } from './components/ITypereactProps';
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';

export interface ITypereactWebPartProps {
  description: string;
}
export interface spListItems{  
  value: spListItem[];
}  
export interface spListItem{  
  //名前
  //Title: string;
  OData__x540d__x524d_1: string;
  //name : string

  //会社
  OData__x6240__x5c5e__x4f1a__x793e_: string;
  //company : string;

  //契約形態
  OData__x5951__x7d04__x5f62__x614b_: string;
  /*
  契約更新日
  OData__x5951__x7d04__x66f4__x65b0__x65: string;
  */
  //limit_of_contract: string;

  //管理
  //OData__x7ba1__x7406__x55b6__x696d_: string;
  OData__x7ba1__x7406_: string;
  //manager:string;

  /*
  //名前
  //Title: string;
  OData__x540d__x524d_1: string;
  //name : string

  //会社
  OData__x6240__x5c5e__x4f1a__x793e_: string;
  //契約更新日
  OData__x5951__x7d04__x66f4__x65b0__x65: string;
  //管理
  //OData__x7ba1__x7406__x55b6__x696d_: string;
  OData__x7ba1__x7406_: string;
  //契約形態
  //OData__x5951__x7d04__x5f62__x614b_:string;
  //状態
  OData__x72b6__x614b_;
  //status: string;
  */

}  

export default class TypereactWebPart extends BaseClientSideWebPart <ITypereactWebPartProps> {

  public render(): void {
    //REST APIのURLを定義
    let status = "OData__x5951__x7d04__x5f62__x614b_";//"status"
    let url: string = this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('全エンジニアリスト')/items?$filter=(${status}%20eq%20null%20or%20${status}%20eq%20%27待機%27)`;  
    this.GetListItems(url).then((response)=>{
      //グラフ描画に必要な値をinterfaceに格納
      let rgraphdatas : standbynum =this.RenderListItems(response.value);  
      //RenderListItemsでinterfaceに格納した値とグラフ描画に必要な情報をinterfaceに格納
      let datas : IChartData = this.getData(rgraphdatas);
      //上で格納した値を使ってグラフをReact要素として定義
    const element: React.ReactElement<ITypereactProps> = React.createElement(
      Typereact,
      {
        datas : datas,
      }
    );
    //Typereact.tsxでレンダリングできるようにexport
    ReactDom.render(element, this.domElement);
    }); 
  }
  //REST APIを使ってリストのデータを取得
  private GetListItems(url: string): Promise<spListItems>{  
      return this.context.spHttpClient.get(url,SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse)=>{  
         return response.json();  
      });  
    }  
  
  //グラフ描画に必要な値をinterfaceに格納
  private RenderListItems(items: spListItem[]): standbynum{  
    let ARTnum: number = 0;
    let ARCSnum: number = 0;
    let ARCTnum: number = 0;
    let ARNnum: number = 0;
    let ARBnum: number = 0;
    let OSDnum: number = 0;
    let ARDnum: number = 0;
    let ARQnum: number = 0;
    let ARWnum: number = 0;
    let ARFnum: number = 0;
    let VARnum: number = 0;
    let othersnum: number = 0;
  
    items.forEach((item: spListItem) => {
    /*
    ここでカウント
    */

    let company = item.OData__x6240__x5c5e__x4f1a__x793e_;//item.company
      
      if (company == "ART"){
        ARTnum+=1;
        
      }
      else if(company == "ARCS"){
        ARCSnum+=1;
        
      }
      else if(company == "ARCT"){
        ARCTnum+=1;
        
      }
      else if(company == "ARN"){
        ARNnum+=1;
        
      }
      else if(company == "ARB"){
        ARBnum+=1;
        
      }
      else if(company == "OSD"){
        OSDnum+=1;
        
      }
      else if(company == "ARD"){
        ARDnum+=1;
        
      }
      else if(company == "ARQ"){
        ARQnum+=1;
        
      }
      else if(company == "ARW"){
        ARWnum+=1;
        
      }
      else if(company == "ARF"){
        ARFnum+=1;
        
      }
      else if(company == "VAR"){
        VARnum+=1;
        
      }
      else{
        othersnum+=1;
        
      }
    });
    return {
      pARTnum : ARTnum,
      pARCSnum : ARCSnum,
      pARCTnum : ARCTnum,
      pARNnum : ARNnum,
      pARBnum : ARBnum,
      pOSDnum : OSDnum,
      pARDnum : ARDnum,
      pARQnum : ARQnum,
      pARWnum : ARWnum,
      pARFnum : ARFnum,
      pVARnum : VARnum,
      pothersnum : othersnum,
    };
  }  

  protected getData(graphdatas:standbynum) : IChartData

  {
    return {

      labels : [ 
        'ART',
        'ARCS',
        'ARCT',
        'ARN',
        'ARB',
        'OSD',
        'ARD',
        'ARQ',
        'ARW',
        'ARF',
        'VAR',
        'その他' 
      ],

      datasets : [

        {

          data : [
            graphdatas.pARTnum,
            graphdatas.pARCSnum,
            graphdatas.pARCTnum,
            graphdatas.pARNnum,
            graphdatas.pARBnum,
            graphdatas.pOSDnum,
            graphdatas.pARDnum,
            graphdatas.pARQnum,
            graphdatas.pARWnum,
            graphdatas.pARFnum,
            graphdatas.pVARnum,
            graphdatas.pothersnum,
          ],

          backgroundColor : [

            'rgba(0, 116, 191, 1)',

            'rgba(242, 207, 1, 1)',
            
            'rgba(222, 150, 16, 1)',
            
            'rgba(86, 167, 100, 1)',
            
            'rgba(201, 58, 64, 1)',
            
            'rgba(242, 207, 1, 1)',
            
            'rgba(209, 107, 22, 1)',
            
            'rgba(204, 82, 139, 1)',
            
            'rgba(208, 109, 140, 1)',
            
            'rgba(160, 194, 56, 1)',
            
            'rgba(101, 172, 228, 1)',

          ],

        }

      ]

    };

  }
}
