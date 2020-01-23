// function get(url) {
//   return {
//     then: function(resolve) {
//       var req = new XMLHttpRequest();
//       var result = [];
//       req.open("get", url, true);
//       req.send(null);

//       req.onload = function() {
//         result = CSVtoArray(req.responseText);
//       };
//       resolve(result);
//     }
//   };
// }

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
      chartData: orgdata,
      activeItem: "",
      selectedItem: "",
      sortState: false,
      average: 0
    },
    methods: {
      selectRows: function(line) {
        this.chartData.splice(0, this.chartData.length);
        for (var i = 3; i < 8; i++)
          this.chartData.push([this.header[i], parseInt(line[i], 10)]);
        drawCharts();
        this.selectedItem = line;
      },
      selectSortOption: function(item) {
        this.selectedItem = item;
      },
      toggleSort: function() {
        this.sortState = !this.sortState;
      },
      sortTable: function(option) {
        var handler = option;
        // console.log("handler is ", handler);
        // console.log("sortState", this.sortState);
        if (this.sortState === false)
          if (handler) {
            if (handler !== 1)
              this.rank.sort(function(a, b) {
                return b[handler] - a[handler];
              });
            else
              this.rank.sort(function(a, b) {
                if (a > b) return -1;
                if (a > b) return 1;
                return 0;
              });
          }
        if (this.sortState === true)
          if (handler !== 1)
            this.rank.sort(function(a, b) {
              return a[handler] - b[handler];
            });
          else
            this.rank.sort(function(a, b) {
              if (a < b) return -1;
              if (a < b) return 1;
              return 0;
            });
      }
    },

    mounted: function() {
      var tmpArray = [];
      axios
        .get("http://www.mn.cis.iwate-u.ac.jp/~nakaya/report/Data.csv")
        .then(response => (tmpArray = CSVtoArray(response.data)))
        .then(() => {
          this.header = tmpArray[0];
          for (var i = 1; i < tmpArray.length - 1; i++)
            this.rank.push(tmpArray[i]);
        });
    }
  });
};
