import React, { useRef, useState, useEffect } from "react"
import { ListView } from "antd-mobile";

type QueryParams = {
 page: number,
 size: number
}

type PropsData = {
 queryPages: (arg: QueryParams) => Promise<any>
}

let rData: any[] = []
const listDataSource = new ListView.DataSource({
 rowHasChanged: (row1: any, row2: any) => row1 !== row2,
});

const usePaginationHooks = (props: PropsData|any ) => {
 const [config, setConfig] = useState({ indicator: false, refreshing: true, page: 1, size: 100, isLastPage: false, dataSource: listDataSource })
 const { queryPages,params } = props;

 /**
  * 下拉刷新
  */
 const refreshHandle = () => {
  setTimeout(() => {
   queryPages({ page: 1, size: config.size,rows:config.size,...params }).then((res:any) => {
    const { last, content,number } = res;
    rData = content
    setConfig({
     ...config,
     refreshing: false,
     indicator: last?true:false,
     isLastPage:last,
     dataSource: config.dataSource.cloneWithRows(rData),
     page: number+1
    })
   }).catch((err:any) => {
    setConfig({
     ...config,
     refreshing: false,
     isLastPage: false,
     indicator: false,
    })
   })
  }, 500);
 };

 /**
 * 上拉更多
 */
 const indicatorHandle = () => {
  queryPages({ page: config.page + 1, size: config.size,rows:config.size,...params  }).then((res:any) => {
   const { last, content } = res;
   rData = [...rData, ...content]
   setConfig({
    ...config,
    indicator: false,
    isLastPage:last,
    dataSource: config.dataSource.cloneWithRows(rData),
    page: config.page + 1
   })
  }).catch((err:any) => {
   setConfig({
    ...config,
    indicator: false,
    isLastPage: false,
    page: config.page + 1
   })
  })
 }

 useEffect(() => {
  if (!config.refreshing) return;
  refreshHandle();
 }, [config.refreshing])

 useEffect(() => {
  if (config.isLastPage) return;
  config.indicator && indicatorHandle();
 }, [config.indicator])
 
 return {
  setIndicator: () => setConfig({ ...config, indicator: true }),
  setRefresing: () => setConfig({ ...config, refreshing: true }),
  refreshHandle,
  indicatorHandle,
  indicator: config.indicator,
  refreshing: config.refreshing,
  isLastPage: config.isLastPage,
  dataSource: config.dataSource,
 }
}
export default usePaginationHooks;