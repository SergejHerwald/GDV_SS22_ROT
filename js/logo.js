var logo = echarts.init(document.getElementById("logo"));
optionLogo = {
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: 'Gruppe Rot',
          fontSize: 50,
          fontWeight: 'bold',
          lineDash: [0, 20],
          lineDashOffset: 0,
          fill: 'transparent',
          stroke: '#000',
          lineWidth: 1
        },
        keyframeAnimation: {
          duration: 2500,
          loop: false,
          keyframes: [
            {
              percent: 0.7,
              style: {
                fill: 'transparent',
                lineDashOffset: 200,
                lineDash: [200, 0]
              }
            },
            {
              // Stop for a while.
              percent: 0.8,
              style: {
                fill: 'transparent'
              }
            },
            {
              percent: 1,
              style: {
                fill: 'yellow'
              }
            }
          ]
        }
      }
    ]
  }
}
logo.setOption(optionLogo);