//var summeFahrrad = echarts.init(document.getElementById("summeFahrrad"),'dark');

let sum = [];
function getSumFahrrad (tsID, startDate, endDate){
  return new Promise((resolve,reject) =>{
    $.getJSON(
      `https://api.mvvsmartcities.com/v3/timeseries?Ocp-Apim-Subscription-Key=8e3b5fe2c8644919ae63394238b89644&timeSeriesId=${tsID}&from=${startDate}&to=${endDate}&func=sum&interval=H&timezone=Europe%2FBerlin&sort=asc&output=split&metadata=false`,
      {},
      function (res) {
        for (let elements in res){ 
          sum.push(res);
        }
        resolve(res); 
        reject("Keine Daten Verfügbar");
      }
    );
  })
}
let startDate = "2022-01-17T08%3A00%3A00.000Z";
let endDate = "2022-05-01T00%3A00%3A00.000Z";

