var orgdata = [];

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
  // var data =  google.visualization.arrayToDataTable(orgdata);
  var data = new google.visualization.DataTable();
  data.addColumn("string", "科目");
  data.addColumn("number", "点数");
  data.addRows(orgdata);
  var options = {
    title: "得点数",
    width: 400,
    height:400,
    hAxis: {
      title: "得点",
      ticks: [0, 20, 40, 60, 80, 100]
    },
    vAxis:{
        title:'科目'
    }
  };
  var chart = new google.visualization.BarChart(
    document.getElementById("chartdiv")
  );
  chart.draw(data, options);
}
