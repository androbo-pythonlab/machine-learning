export interface ITypereactProps {
  datas : IChartData;
}

export interface IChartData {
  labels : string[];
  datasets : IDataSet[];
}

export interface IDataSet {
  data: number[];
  backgroundColor: string[];
}

export interface standbynum {
  pARTnum: number;
  pARCSnum: number;
  pARCTnum: number;
  pARNnum: number; 
  pARBnum: number; 
  pOSDnum: number; 
  pARDnum: number;
  pARQnum: number;
  pARWnum: number;
  pARFnum: number;
  pVARnum: number;
  pothersnum: number;
}