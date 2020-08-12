import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import styles from './DynamicviewWebPart.module.scss';
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';

export interface IStandbynumWebPartProps {
}
export interface spListItems{  
  value: spListItem[];
}  
export interface spListItem{  
  //名前
  //Title: string;
  OData__x540d__x524d_1: string;
  
  //会社
  OData__x6240__x5c5e__x4f1a__x793e_: string;
  //契約形態
  OData__x5951__x7d04__x5f62__x614b_: string;

  //契約更新日
  OData__x5951__x7d04__x66f4__x65b0__x65: string;
  
  //管理
  //OData__x7ba1__x7406__x55b6__x696d_: string;
  OData__x7ba1__x7406_: string;

  //契約形態
  //OData__x5951__x7d04__x5f62__x614b_:string;
  //状態
  OData__x72b6__x614b_;

  /*
  //名前
  //Title: string;
  OData__x540d__x524d_1: string;
  //会社
  OData__x6240__x5c5e__x4f1a__x793e_: string;
  //契約更新日
  OData__x5951__x7d04__x66f4__x65b0__x65: string;
  //管理
  //OData__x7ba1__x7406__x55b6__x696d_: string;
  OData__x7ba1__x7406_: string;
  //契約形態
  //OData__x5951__x7d04__x5f62__x614b_:string;
  //状態
  OData__x72b6__x614b_;
  */

}  
export interface spList{  
  Title:string;  
  id: string;  
}  
export interface spLists{  
  value: spList[];  
} 

export default class StandbynumWebPart extends BaseClientSideWebPart<IStandbynumWebPartProps> {
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.testWebPart}">
        <div class="${styles.container}">
          <div class="${styles.row}">  
             <div class="${styles.listTable}">
              <div id="spListContainer" class="${styles.listTable}"></div>
             </div> 
          </div>  
        </div>
      </div>`;
      this.LoadListItems();
  }

private LoadListItems(): void{  
    let url: string = this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('全エンジニアリスト')/items?$top=500`;  
    this.GetListItems(url).then((response)=>{  
      if(!response.value)
      {
      console.log("error");
      }
      else{
          this.RenderListItems(response.value);  
      }
    }); 
}  
private GetListItems(url: string): Promise<spListItems>{  
    return this.context.spHttpClient.get(url,SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse)=>{  
       return response.json();  
    });  
  }  

 private RenderListItems(items: spListItem[]): void{  
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
    let ARTall: number = 0;
    let ARCSall: number = 0;
    let ARCTall: number = 0;
    let ARNall: number = 0;
    let ARBall: number = 0;
    let OSDall: number = 0;
    let ARDall: number = 0;
    let ARQall: number = 0;
    let ARWall: number = 0;
    let ARFall: number = 0;
    let VARall: number = 0;
    let othersall: number = 0;
    let html = '';

    let data = new Date();
    let y_now : Number = data.getFullYear();
    let m_now : Number　= data.getMonth()+1;
    let d_now : Number　= data.getDate();
    let y : Number;
    let m : Number;
    let d : Number;

    items.forEach((item: spListItem) => {
    /*
    ここでカウント
    */

      let company = item.OData__x6240__x5c5e__x4f1a__x793e_;
      //let status = item.OData__x72b6__x614b_;
      let status = item.OData__x5951__x7d04__x5f62__x614b_;

      let tempdate = item.OData__x5951__x7d04__x66f4__x65b0__x65;

    //契約更新日がnullでない時
    if (tempdate != null){

      //取得時の2020-01-01T〇〇〇〇 を 2020/01/01の形に変換
      tempdate = tempdate.split('T')[0].replace(/-/g,'/');

      //契約形態が稼働中の時、契約更新日を年,月,日ごとに変数に格納
      if (status == '稼働中'){
        y = Number(tempdate.split('/')[0]);
        m = Number(tempdate.split('/')[1]);
        d = Number(tempdate.split('/')[2]);

        //現在日時が契約更新日を過ぎていたら'稼働中'から'待機'へ変更
        if (y <= y_now && m == m_now && d < d_now){
          status = '待機';
        }if (y <= y_now && m < m_now) {
          status = '待機';
        }
      }
    }

   if (company == "ART"){
    ARTall+=1;
    if(status == "null" || status == "待機"){
    ARTnum+=1;
    }
  }
  else if(company == "ARCS"){
    ARCSall+=1;
    if(status == "null" || status == "待機"){
    ARCSnum+=1;
    }
  }
  else if(company == "ARCT"){
    ARCTall+=1;
    if(status == "null" || status == "待機"){
    ARCTnum+=1;
    }
  }
  else if(company == "ARN"){
    ARNall+=1;
    if(status == "null" || status == "待機"){
    ARNnum+=1;
    }
  }
  else if(company == "ARB"){
    ARBall+=1;
    if(status == "null" || status == "待機"){
    ARBnum+=1;
    }
  }
  else if(company == "OSD"){
    OSDall+=1;
    if(status == "null" || status == "待機"){
    OSDnum+=1;
    }
  }
  else if(company == "ARD"){
    ARDall+=1;
    if(status == "null" || status == "待機"){
    ARDnum+=1;
    }
  }
  else if(company == "ARQ"){
    ARQall+=1;
    if(status == "null" || status == "待機"){
    ARQnum+=1;
    }
  }
  else if(company == "ARW"){
    ARWall+=1;
    if(status == "null" || status == "待機"){
    ARWnum+=1;
    }
  }
  else if(company == "ARF"){
    ARFall+=1;
    if(status == "null" || status == "待機"){
    ARFnum+=1;
    }
  }
  else if(company == "VAR"){
    VARall+=1;
    if(status == "null" || status == "待機"){
    VARnum+=1;
    }
  }
  else{
    othersall+=1;
    if(status == "null" || status == "待機"){
    othersnum+=1;
    }
  }
    });
      if (location.pathname.split("/")[4].replace(".aspx","") == "ART"){
        html = `
      <table>
      <th>会社名</th><th>人数</th><th>対象人数</th>
      <tr>
        <td>ART</td>
        <td>${ARTnum}</td>
        <td>${ARTall}</td>
      </tr>
      </tr>
      </table>`;
      }
      else if(location.pathname.split("/")[4].replace(".aspx","") == "ARCS"){
        html=`
        <table>
      <th>会社名</th><th>人数</th><th>対象人数</th>
        <tr>
        <td>ARCS</td>
        <td>${ARCSnum}</td>
        <td>${ARCSall}</td>
      </tr>
      </tr>
      </table>`;
      }
      else if(location.pathname.split("/")[4].replace(".aspx","") == "ARCT"){
        html=`
        <table>
      <th>会社名</th><th>人数</th><th>対象人数</th>
        <tr>
        <td>ARCT</td>
        <td>${ARCTnum}</td>
        <td>${ARCTall}</td>
      </tr>
      </tr>
      </table>`;
      }
      else if(location.pathname.split("/")[4].replace(".aspx","") == "ARN"){
        html=`
        <table>
      <th>会社名</th><th>人数</th><th>対象人数</th>
        <tr>
        <td>ARN</td>
        <td>${ARNnum}</td>
        <td>${ARNall}</td>
      </tr>
      </tr>
      </table>`;
      }
      else if(location.pathname.split("/")[4].replace(".aspx","") == "ARB"){
        html=`
        <table>
      <th>会社名</th><th>人数</th><th>対象人数</th>
        <tr>
        <td>ARB</td>
        <td>${ARBnum}</td>
        <td>${ARBall}</td>
      </tr>
      </tr>
      </table>`;
      }
      else if(location.pathname.split("/")[4].replace(".aspx","") == "OSD"){
        html=`
        <table>
      <th>会社名</th><th>人数</th><th>対象人数</th>
        <tr>
        <td>OSD</td>
        <td>${OSDnum}</td>
        <td>${OSDall}</td>
      </tr>
      </tr>
      </table>`;
      }
      else if(location.pathname.split("/")[4].replace(".aspx","") == "ARD"){
        html=`
        <table>
      <th>会社名</th><th>人数</th><th>対象人数</th>
        <tr>
        <td>ARD</td>
        <td>${ARDnum}</td>
        <td>${ARDall}</td>
      </tr>
      </tr>
      </table>`;
      }
      else if(location.pathname.split("/")[4].replace(".aspx","") == "ARQ"){
        html=`
        <table>
      <th>会社名</th><th>人数</th><th>対象人数</th>
        <tr>
        <td>ARQ</td>
        <td>${ARQnum}</td>
        <td>${ARQall}</td>
      </tr>
      </tr>
      </table>`;
      }
      else if(location.pathname.split("/")[4].replace(".aspx","") == "ARW"){
        html=`
        <table>
      <th>会社名</th><th>人数</th><th>対象人数</th>
        <tr>
        <td>ARW</td>
        <td>${ARWnum}</td>
        <td>${ARWall}</td>
      </tr>
      </tr>
      </table>`;
      }
      else if(location.pathname.split("/")[4].replace(".aspx","") == "ARF"){
        html=`
        <table>
      <th>会社名</th><th>人数</th><th>対象人数</th>
        <tr>
        <td>ARF</td>
        <td>${ARFnum}</td>
        <td>${ARFall}</td>
      </tr>
      </tr>
      </table>`;
      }
      else if(location.pathname.split("/")[4].replace(".aspx","") == "VAR"){
        html=`
        <table>
      <th>会社名</th><th>人数</th><th>対象人数</th>
        <tr>
        <td>VAR</td>
        <td>${VARnum}</td>
        <td>${VARall}</td>
      </tr>
      </tr>
      </table>`;
      }
      else{
        html=`
        <table>
      <th>会社名</th><th>人数</th><th>対象人数</th>
        <tr>
        <td>その他</td>
        <td>${othersnum}</td>
        <td>${othersall}</td>
      </tr>
      </tr>
      </table>`;
      }

      this.domElement.querySelector('#spListContainer').innerHTML = html;
  }  
}