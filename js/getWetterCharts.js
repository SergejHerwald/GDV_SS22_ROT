var tempChart = echarts.init(document.getElementById("tempChart"));

let wetterArr = [ {
name: "0085EF4F08FF5288",
timeSeriesId: "4d575f40-4930-48e8-93f5-a8be9241b404"},
{
name: "WeatherData2875376",
timeSeriesId: "1a959671-e28b-47c6-946f-eb556f04caa1"},
{
name: "WeatherData2873891",
timeSeriesId: "644c2622-bc30-45f8-80bd-c6bab411e0c0"}
]


let precipitationArr = [ {
name: "0085EF4F08FF5288_precipitation_intensity",
timeSeriesId: "ed86d215-0bac-4f2d-b809-38d2f00e9129"},
{
name: "0085EF4F08FF5288_precipitation_type",
timeSeriesId: "08febe79-4d7d-41b6-a09a-d7788ae582ec"},

]



function getData(tsID, startDate, endDate, interval, limit, func){
data = [];
console.log(startDate);
console.log(endDate);
var url = `https://api.mvvsmartcities.com/v3/timeseries?Ocp-Apim-Subscription-Key=8e3b5fe2c8644919ae63394238b89644&timeSeriesId=${tsID}&func=${func}&interval=${interval}&timezone=Europe%2FBerlin&output=split&limit=${limit}&metadata=false&startDate=${startDate}&endDate=${endDate}&sort=asc`;
console.log(url);
var promise = new Promise((resolve,reject) =>{
    $.getJSON(
url,
      {},
      function (res) {
         
          data.push(res);
 
          // weatherData.push(res);
        console.log(res);
        resolve(res);
        reject("Keine Daten Verfügbar");
      }
    );
  });
  console.log(promise);
  return promise;
}
// getTemp(wetterArr[0].timeSeriesId, "2022-01-01T00%3A00%3A00.000Z", "2022-05-24T00%3A00%3A00.000Z").then(res =>{
//     console.log(res);
//     return res;
//     });
async function getTempChart(input){
    try{
    switch (input){
        case 0:
            weatherStation = "0085EF4F08FF5288";
            break;  
        case 1:
            weatherStation = "WeatherData2875376";
            break;
        case 2: 
            weatherStation = "WeatherData2873891";
            break;
        default :
            weatherStation = "0085EF4F08FF5288";
    
    }
    const response = await getData(wetterArr[input].timeSeriesId, "2022-01-01T00%3A00%3A00.000Z", "2022-05-24T00%3A00%3A00.000Z", 'M',1000, 'avg');
  console.log(response);
  tempChart.setOption(
    (option = {
      title: {
        text: "Mannheim - "+ weatherStation +" - Temperatur",
    
      },
      tooltip:{
        trigger: 'axis'
      },
      grid:{
        left: '5%',
        right: '15%',
        bottom: '10%'
      },
      xAxis: {
        type: "category",
        data: response[0].timestamps
      },
      yAxis: {
        type: "value",
      },toolbox: {
        right: 10,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          type: "line",
          color: '#FF0000',
          data: response[0].values,
        },
      ],
    })
  );
  }
  catch (err){
    console.log(err);
  }


}
async function getPrecipitationChart(){
try{
const response = await getData(precipitationArr[0].timeSeriesId, "2022-01-01T00%3A00%3A00.000Z", "2022-05-24T00%3A00%3A00.000Z", 'd', 10000, 'avg');
  console.log(response);
  tempChart.setOption(
    (option = {
      title: {
        text: "Mannheim - Niederschlag",
      
      },
      tooltip:{
        trigger: 'axis'
      },
      grid:{
        left: '5%',
        right: '15%',
        bottom: '10%'
      },
      xAxis: {
        type: "category",
        data: response[0].timestamps
      },
      yAxis: {
        type: "value",
      },toolbox: {
        right: 10,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
 
      series: [
        {
          type: "line",
          color: '#0000FF',
          data: response[0].values,
        },
      ],
    })
  );
  }
  catch (err){
    console.log(err);
  }
}


