import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import styles from './StandbynumWebPart.module.scss';
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
  OData__x540d__x524d_1: string;

  //会社
  OData__x6240__x5c5e__x4f1a__x793e_: string;
  //company : string;

  //契約形態
  OData__x5951__x7d04__x5f62__x614b_: string;
  /*
  契約更新日
  OData__x5951__x7d04__x66f4__x65b0__x65: string;
  */

  //管理
  //OData__x7ba1__x7406__x55b6__x696d_: string;
  OData__x7ba1__x7406_: string;

  //契約形態
  //OData__x5951__x7d04__x5f62__x614b_:string;
  //status: string;
  //状態
  OData__x72b6__x614b_: string;

  /*
  //名前
  //Title: string;
  OData__x540d__x524d_1: string;
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
  */

}  

export default class StandbynumWebPart extends BaseClientSideWebPart<IStandbynumWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = 
    `
      <div class="${styles.testWebPart}">
        <div class="${styles.container}">
          <div class="${styles.row}">  
             <div class="${styles.listTable}">
              <div 
                id="spListContainer" 
                class="${styles.listTable}"
              >
              </div>
             </div> 
          </div>  
        </div>
      </div>
    `;
      this.LoadListItems();
  }

private LoadListItems(): void{  
  //REST APIを利用してsharepointリストを取得する
   let url: string = this.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('全エンジニアリスト')/items?$top=1000";  
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

  items.forEach((item: spListItem) => {
  /*
  ここでカウント
  */
    
    let company = item.OData__x6240__x5c5e__x4f1a__x793e_;//item.company
    //let status = item.OData__x72b6__x614b_;//item.status
    let status = item.OData__x5951__x7d04__x5f62__x614b_;
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
    /*
    let html: string = `
    <table>
    <th>会社名</th><th>人数</th><th>対象人数</th>
    <tr>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ART.aspx">ART</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ART.aspx">${ARTnum}</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ART.aspx">${ARTall}</a></td>
    </tr>
    <tr>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARCS.aspx">ARCS</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARCS.aspx">${ARCSnum}</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARCS.aspx">${ARCSall}</a></td>
    </tr>
    <tr>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARCT.aspx">ARCT</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARCT.aspx">${ARCTnum}</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARCT.aspx">${ARCTall}</a></td>
    </tr>
    <tr>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARN.aspx">ARN</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARN.aspx">${ARNnum}</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARN.aspx">${ARNall}</a></td>
    </tr>
    <tr>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARB.aspx">ARB</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARB.aspx">${ARBnum}</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARB.aspx">${ARBall}</a></td>
    </tr>
    <tr>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/OSD.aspx">OSD</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/OSD.aspx">${OSDnum}</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/OSD.aspx">${OSDall}</a></td>
    </tr>
    <tr>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARD.aspx">ARD</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARD.aspx">${ARDnum}</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARD.aspx">${ARDall}</a></td>
    </tr>
    <tr>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARQ.aspx">ARQ</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARQ.aspx">${ARQnum}</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARQ.aspx">${ARQall}</a></td>
    </tr>
    <tr>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARW.aspx">ARW</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARW.aspx">${ARWnum}</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARW.aspx">${ARWall}</a></td>
    </tr>
    <tr>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARF.aspx">ARF</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARF.aspx">${ARFnum}</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARF.aspx">${ARFall}</a></td>
    </tr>
    <tr>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/VAR.aspx">VAR</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/VAR.aspx">${VARnum}</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/VAR.aspx">${VARall}</a></td>
    </tr>
    <tr>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/その他.aspx">その他</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/その他.aspx">${othersnum}</a></td>
      <td><a href="https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/その他.aspx">${othersall}</a></td>
    </tr>
    <tr>
      <td>合計</td>
      <td>${ARTnum+ARCSnum+ARCTnum+ARNnum+ARBnum+OSDnum+ARDnum+ARQnum+ARWnum+ARFnum+VARnum+othersnum}</td>
      <td>${ARTall+ARCSall+ARCTall+ARNall+ARBall+OSDall+ARDall+ARQall+ARWall+ARFall+VARall+othersall}</td>
    </tr>
    </table>
        `;
    */
   let html: string = `
   <table>
   <th>会社名</th><th>人数</th><th>対象人数</th>
   <tr>
     <td>ART</td>
     <td>${ARTnum}</td>
     <td>${ARTall}</td>
   </tr>
   <tr>
     <td>ARCS</td>
     <td>${ARCSnum}</td>
     <td>${ARCSall}</td>
   </tr>
   <tr>
     <td>ARCT</td>
     <td>${ARCTnum}</td>
     <td>${ARCTall}</td>
   </tr>
   <tr>
     <td>ARN</td>
     <td>${ARNnum}</td>
     <td>${ARNall}</td>
   </tr>
   <tr>
     <td>ARB</td>
     <td>${ARBnum}</td>
     <td>${ARBall}</td>
   </tr>
   <tr>
     <td>OSD</td>
     <td>${OSDnum}</td>
     <td>${OSDall}</td>
   </tr>
   <tr>
     <td>ARD</td>
     <td>${ARDnum}</td>
     <td>${ARDall}</td>
   </tr>
   <tr>
     <td>ARQ</td>
     <td>${ARQnum}</td>
     <td>${ARQall}</td>
   </tr>
   <tr>
     <td>ARW</td>
     <td>${ARWnum}</td>
     <td>${ARWall}</td>
   </tr>
   <tr>
     <td>ARF</td>
     <td>${ARFnum}</td>
     <td>${ARFall}</td>
   </tr>
   <tr>
     <td>VAR</td>
     <td>${VARnum}</td>
     <td>${VARall}</td>
   </tr>
   <tr>
     <td>その他</td>
     <td>${othersnum}</td>
     <td>${othersall}</td>
   </tr>
   <tr>
     <td>合計</td>
     <td>${ARTnum+ARCSnum+ARCTnum+ARNnum+ARBnum+OSDnum+ARDnum+ARQnum+ARWnum+ARFnum+VARnum+othersnum}</td>
     <td>${ARTall+ARCSall+ARCTall+ARNall+ARBall+OSDall+ARDall+ARQall+ARWall+ARFall+VARall+othersall}</td>
   </tr>
   </table>
       `;

    this.domElement.querySelector('#spListContainer').innerHTML = html;

  });
}  


}