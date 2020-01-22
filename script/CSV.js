function get(url) {
  return {
    then: function(resolve) {
      var req = new XMLHttpRequest();
      var result = [];
      req.open("get", url, true);
      req.send(null);

      req.onload = function() {
        result = CSVtoArray(req.responseText);
      };
      resolve(result);
    }
  };
}

function CSVtoArray(rawCSV) {
  var result = [];

  var tmpData = rawCSV.split("\n");

  for (var i = 0; i < tmpData.length; ++i) {
    result[i] = tmpData[i].split(",");
  }

  return result;
}

window.onload = () => {
  const vm = new Vue({
    el: "#tableApp",
    data: {
      header: [],
      rank: [],
      chartData: orgdata
    },
    methods: {
      clickfunc: function(line) {
        // console.log("selected", line[3]);
        this.chartData.splice(0, this.chartData.length);
        for (var i = 3; i < 8; i++)
          this.chartData.push([this.header[i], parseInt(line[i],10)]);
        drawCharts();
      }
    },
    mounted: function() {
      var tmpArray = [];
      axios
        .get("http://www.mn.cis.iwate-u.ac.jp/~nakaya/report/Data.csv")
        .then(response => (tmpArray = CSVtoArray(response.data)))
        .then(() => {
          this.header = tmpArray[0];
          for (var i = 1; i < tmpArray.length; i++) this.rank.push(tmpArray[i]);
        });
    }
  });
};
