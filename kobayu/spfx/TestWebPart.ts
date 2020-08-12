import {
  BaseClientSideWebPart,
} from '@microsoft/sp-webpart-base';
import styles from './TestWebPart.module.scss';
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';


export interface ITestWebPartWebPartProps {
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

  //契約形態
  OData__x5951__x7d04__x5f62__x614b_: string;
  
  //契約更新日
  OData__x5951__x7d04__x66f4__x65b0__x65: string;
  

  //管理営業
  OData__x7ba1__x7406__x55b6__x696d_: string;
  //管理
  //OData__x7ba1__x7406_: string;

  //契約形態
  //OData__x5951__x7d04__x5f62__x614b_:string;
  //状態
  OData__x72b6__x614b_: string;

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
export interface spList{  
  Title:string;  
  id: string;  
}  
export interface spLists{  
  value: spList[];  
} 

export default class TestWebPartWebPart extends BaseClientSideWebPart<ITestWebPartWebPartProps> {
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.testWebPart}">
        <div class="${styles.container}">
          <div class="${styles.row}">  
             <div id="spListContainer" class="${styles.listTable}"></div> 
          </div>  
        </div>
      </div>`;
      this.LoadListItems();
  }
private LoadListItems(): void{  
                                                           　//%E3%81%9D%E3%81%AE%E4%BB%96=その他
  if (location.pathname.split("/")[4].replace(".aspx","") == "%E3%81%9D%E3%81%AE%E4%BB%96"){
    let url: string = this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('全エンジニアリスト')/items?$top=500`;  
    this.GetListItems(url).then((response)=>{  
      if(!response.value)
      {
      }
      else{
          this.RenderListItemsothers(response.value);  
      }
    }); 
  }
  else{
    let url: string = this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('全エンジニアリスト')/items?$filter=OData__x6240__x5c5e__x4f1a__x793e_ eq '${location.pathname.split("/")[4].replace(".aspx","")}' and (OData__x5951__x7d04__x5f62__x614b_%20eq%20null%20or%20OData__x5951__x7d04__x5f62__x614b_%20eq%20%27待機%27)`;  
    this.GetListItems(url).then((response)=>{  
      if(!response.value)
      {
      }
      else{
          this.RenderListItems(response.value);  
      }
    }); 
  } 
}  
private GetListItems(url: string): Promise<spListItems>{  
    return this.context.spHttpClient.get(url,SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse)=>{  
       return response.json();  
    });  
  }  

 private RenderListItems(items: spListItem[]): void{  
    let html: string = '<table>';
    html += `<th>会社名</th><th>名前</th><th>提案額</th><th>契約更新日</th><th>管理営業</th>`;
    items.forEach((item: spListItem) => {
    if (item.OData__x5951__x7d04__x66f4__x65b0__x65 == null){
    html += `
    <tr>
      <td>${item.OData__x6240__x5c5e__x4f1a__x793e_}</td>
      <td>${item.OData__x540d__x524d_1}</td>
      <td> </td>
      <td> </td>
      <td>${item.OData__x7ba1__x7406__x55b6__x696d_}</td>
    </tr>
        `;
    }
    else{
    let tempdate = item.OData__x5951__x7d04__x66f4__x65b0__x65.split('-');
    let tempdates = tempdate[0]+"/"+tempdate[1]+"/"+tempdate[2].slice(0,2);  
    html += `
    <tr>
    <td>${item.OData__x6240__x5c5e__x4f1a__x793e_}</td>
    <td>${item.OData__x540d__x524d_1}</td>
    <td> </td>
    <td>${tempdates}</td>
    <td>${item.OData__x7ba1__x7406__x55b6__x696d_}</td>
    </tr>
        `;
    }
    });
    html += `</table>`;
    this.domElement.querySelector('#spListContainer').innerHTML = html;
  }  
  private RenderListItemsothers(items: spListItem[]): void{  
    let html: string = '<table>';
    html += `<th>会社名</th><th>名前</th><th>提案額</th><th>契約更新日</th><th>管理営業</th>`;
    items.forEach((item: spListItem) => {
      const company = 
      [
        "ART",
        "ARCS",
        "ARCT",
        "ARN",
        "ARB",
        "OSD",
        "ARD",
        "ARQ",
        "ARW",
        "ARF",
        "VAR"
      ];
      if(company.indexOf(item.OData__x6240__x5c5e__x4f1a__x793e_) < 0)
          {
            if(item.OData__x5951__x7d04__x5f62__x614b_ == "null" || item.OData__x5951__x7d04__x5f62__x614b_ == "待機"){
            if (item.OData__x5951__x7d04__x66f4__x65b0__x65 == null){
                html += `
                <tr>
                  <td>${item.OData__x6240__x5c5e__x4f1a__x793e_}</td>
                  <td>${item.OData__x540d__x524d_1}</td>
                  <td> </td>
                  <td> </td>
                  <td>${item.OData__x7ba1__x7406__x55b6__x696d_}</td>
                </tr>
                    `;
                }
                else{
                let tempdate = item.OData__x5951__x7d04__x66f4__x65b0__x65.split('-');
                let tempdates = tempdate[0]+"/"+tempdate[1]+"/"+tempdate[2].slice(0,2);  
                html += `
                <tr>
                <td>${item.OData__x6240__x5c5e__x4f1a__x793e_}</td>
                <td>${item.OData__x540d__x524d_1}</td>
                <td> </td>
                <td>${tempdates}</td>
                <td>${item.OData__x7ba1__x7406__x55b6__x696d_}</td>
                </tr>
                    `;
                }
              }
          }
    
    });
    html += `</table>`;
    this.domElement.querySelector('#spListContainer').innerHTML = html;
  }  


}
