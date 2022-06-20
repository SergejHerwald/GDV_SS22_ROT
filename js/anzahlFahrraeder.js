var summeFahrrad = echarts.init(document.getElementById("summeFahrrad"),'dark');

let fahrrArr = [
  {
      "name": "mavi001",
      "timeSeriesId": "00f21618-e568-4655-8752-bd58e7b7ae62"
  },
  {
      "name": "mavi004",
      "timeSeriesId": "cce2942f-93af-4d88-a0ab-f73af12f9414"
  },
  {
      "name": "mavi009",
      "timeSeriesId": "5df18a0a-f265-4b3f-9dac-c9f3e69398bd"
  },
  {
      "name": "mavi015",
      "timeSeriesId": "2695f99f-e084-429c-a9cd-56e784db11e0"
  },
  {
      "name": "mavi018",
      "timeSeriesId": "5d23d4f6-bc22-4a03-ac99-456af432178e"
  },
  {
      "name": "mavi014",
      "timeSeriesId": "ba4435d4-17d5-40f2-ab9f-15ac6cd81b09"
  },
  {
      "name": "mavi011",
      "timeSeriesId": "92f614ee-51f9-4d62-9cc5-1251ddb3b767"
  }
];


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


let sumFahrr = [];
let startDate = "2022-01-17T08%3A00%3A00.000Z";
function setStartDate(valStartDate){
  return new Promise ((resolve, reject) =>{
    resolve(valStartDate);
  })
}
function setEndDate(valEndDate){
  return new Promise ((resolve, reject) =>{
    resolve(valEndDate);
  })
}
let startDate2 = setStartDate(startDate);
//console.log(startDate2)

function pad2(n) {
  return (n < 10 ? '0' : '') + n;
}
var date = new Date();
var month = pad2(date.getMonth()+1);//months (0-11)
var day = pad2(date.getDate());//day (1-31)
var year= date.getFullYear();

let formattedDate =  year+"-"+month+"-"+day+"T"+23+":"+59+":"+59+"."+999+"Z";
let endDate = "2022-05-01T00%3A00%3A00.000Z";

async function doWork(input){
  console.log(input);
  try{
    let kamera ="";
    let auswahl=0;
    switch (input){
      case "mavi001":
        kamera = "mavi001";
        auswahl= 0;
        break;
      case "mavi004":
        kamera = "mavi004";
        auswahl=1;
        break;
      case "mavi009":
        kamera = "mavi009";
        auswahl=2;
        break;
      case "mavi015":
        kamera = "mavi015";
        auswahl=3;
        break;
      case "mavi018":
        kamera = "mavi018";
        auswahl=4;
        break;
      case "mavi014":
        kamera = "mavi014";
        auswahl=5;
        break;
      case "mavi011":
        kamera = "mavi011";
        auswahl=6;
        break;
      default:
        kamera = "mavi001";
        auswahl=0;
        break;
    }
  const responseFahrr = await getSumFahrrad(fahrrArr[auswahl].timeSeriesId, startDate, formattedDate);
  summeFahrrad.setOption(
    (option = {
      title: {
        text: kamera,
        subtext: "Anzahl Fahrräder 2022 Januar - Heute"
      },
      tooltip:{
        trigger: 'axis'
      },
      xAxis: {
        type: "category",
        data: timestampstoString(responseFahrr[0].timestamps)
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
      dataZoom: [
        {
          startValue: '2022-01-17'
        },
        {
          type: 'inside'
        }
      ],
      series: [
        {
          type: "line",
          smooth: true,
          color: '#6AD368',
          data: responseFahrr[0].values,
          markLine: {
            data: [{ type: 'average', name: 'Avg' }]
          }
        },
      ],
    })
  );

  }catch (err){
    console.log(err);
  }

}
summeFahrrad.group = 'zweiraeder';
echarts.connect('zweiraeder');
doWork(0);

