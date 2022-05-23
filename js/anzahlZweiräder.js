var summeZweirad = echarts.init(document.getElementById("summeZweirad"));

let sum = [];
function getSumZweirad2(tsID, startDate, endDate) {
  $.getJSON(
    `https://api.mvvsmartcities.com/v3/timeseries?Ocp-Apim-Subscription-Key=8e3b5fe2c8644919ae63394238b89644&timeSeriesId=${tsID}&from=${startDate}&to=${endDate}&func=sum&interval=d&timezone=Europe%2FBerlin&sort=asc&output=records&metadata=false`,
    {},
    function (res) {
      sum.push(res[0]);
    }
  );
  return sum;
}

let sumFahrr = [];
let startDate = "2022-04-01T00%3A00%3A00.000Z";
let endDate = "2022-05-01T00%3A00%3A00.000Z";
let temp1 = [];
function getData(fahrr, motor) {
  sumFahrr = getSumZweirad2(fahrr[0].timeSeriesId, startDate, endDate);
}

summeZweirad.setOption(
  (option = {
    title: {
      text: "Mannheim",
      left: "center",
      textStyle: {
        color: "black",
      },
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "line",
        data: [
          ["monatag", 10],
          ["dienstag", 20],
        ],
      },
    ],
  })
);
