var orgdata = [];

google.charts.load('current',{packages:['corechart']});
google.charts.setOnLoadCallback(drawCharts);

function drawCharts(){
    // var data =  google.visualization.arrayToDataTable(orgdata);
    var data = new google.visualization.DataTable();
    data.addColumn('string','test');
    data.addColumn('number','slices');
    data.addRows(orgdata);
    var options = {title:'点数'}
    var chart = new google.visualization.BarChart(
        document.getElementById('chartdiv')
    );
    console.log(orgdata);
    chart.draw(data, options)
}