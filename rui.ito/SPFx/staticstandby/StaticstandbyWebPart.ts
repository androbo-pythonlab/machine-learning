import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import styles from './StaticstandbyWebPart.module.scss';

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
  OData__x540d__x524d_1: string;
  //会社
  OData__x6240__x5c5e__x4f1a__x793e_: string;
  //契約形態
  OData__x5951__x7d04__x5f62__x614b_: string;

  //契約更新日
  OData__x5951__x7d04__x66f4__x65b0__x65: string;

  //提案額
    OData__x63d0__x6848__x984d_: string;

  //管理営業
  OData__x7ba1__x7406__x55b6__x696d_: string;
  //管理
  //OData__x7ba1__x7406_: string;
}

//契約形態
//OData__x5951__x7d04__x5f62__x614b_
//状態
//OData__x72b6__x614b_

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
  let url: string = this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('全エンジニアリスト')/items?$top=1000`;

this.GetListItems(url).then((response)=>{
    if(!response.value)
    {
    this.domElement.querySelector('#spListContainer').innerHTML = "リストを指定してください";
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
  let html: string = '<table>';
  html += `<th>会社名</th><th>名前</th><th>提案額</th><th>契約更新日</th><th>管理営業</th>`;
  let data = new Date();
  let y_now : Number = data.getFullYear();
  let m_now : Number　= data.getMonth()+1;
  let d_now : Number　= data.getDate();
  let y : Number;
  let m : Number;
  let d : Number;

  items.forEach((item: spListItem) => {
  let tempdate = item.OData__x5951__x7d04__x66f4__x65b0__x65;
  let status = item.OData__x5951__x7d04__x5f62__x614b_;
  let real_value = item.OData__x63d0__x6848__x984d_;
  if(real_value == null){
    real_value = '';
  }
  if(tempdate == null){
    tempdate = '';
  }if(tempdate != null){
    tempdate = tempdate.split('T')[0].replace(/-/g,'/');
  }
    if (status == '稼働中'){
      y = Number(tempdate.split('/')[0]);
      m = Number(tempdate.split('/')[1]);
      d = Number(tempdate.split('/')[2]);

      if (y <= y_now && m == m_now && d < d_now){
        status = '待機';
        tempdate = '<span>' + tempdate + '</span>';
      }if (y <= y_now && m < m_now) {
        status = '待機';
        tempdate = '<span>' + tempdate + '</span>';
      }
      }

    if(status == '待機'){

      html += `
      <tr>
        <td>${item.OData__x6240__x5c5e__x4f1a__x793e_}</td>
        <td>${item.OData__x540d__x524d_1}</td>
        <td>${real_value}</td>
        <td>${tempdate}</td>
        <td>${item.OData__x7ba1__x7406__x55b6__x696d_}</td>
      </tr>
      `;
    }

  });
  html += `</table>`;
  this.domElement.querySelector('#spListContainer').innerHTML = html;
}
}
