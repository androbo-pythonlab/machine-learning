import * as React from 'react';
import styles from './Typereact.module.scss';
import { ITypereactProps } from './ITypereactProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Doughnut } from 'react-chartjs-2';



export default class Typereact extends React.Component<ITypereactProps, {}> {
  
  public render(): React.ReactElement<ITypereactProps> {
    
    return (
      <div>

        <Doughnut data={ this.props.datas } width={800} height={600} options={{ maintainAspectRatio: false }} 
        onElementsClick={elems => {
          if(elems[0]._index == 0){
            window.open("https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ART.aspx");
          }
          else if(elems[0]._index == 1){
            window.open("https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARCS.aspx");  
          }
          else if(elems[0]._index == 2){
            window.open("https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARCT.aspx");  
          }
          else if(elems[0]._index == 3){
            window.open("https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARN.aspx");  
          }
          else if(elems[0]._index == 4){
            window.open("https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARB.aspx");  
          }
          else if(elems[0]._index == 5){
            window.open("https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/OSD.aspx");  
          }
          else if(elems[0]._index == 6){
            window.open("https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARD.aspx");  
          }
          else if(elems[0]._index == 7){
            window.open("https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARQ.aspx");  
          }
          else if(elems[0]._index == 8){
            window.open("https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARW.aspx");  
          }
          else if(elems[0]._index == 9){
            window.open("https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/ARF.aspx");  
          }
          else if(elems[0]._index == 10){
            window.open("https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/VAR.aspx");  
          }
          else if(elems[0]._index == 11){
            window.open("https://androbocs333.sharepoint.com/sites/ARGorganizationtable/SitePages/その他.aspx");  
          }
        }}
        >
        </Doughnut>

      </div>
    );
  }
}
