// function getCSV() {
//     var dataArray;
//     var req = new XMLHttpRequest();
//     req.open("get", "http://www.mn.cis.iwate-u.ac.jp/~nakaya/report/Data.csv", true);
//     req.send(null);

//     req.onload = function() {
//         dataArray = convertCSVtoArray(req.responseText);
//     }
//     console.log(dataArray);
//     return dataArray;
// }

// function convertCSVtoArray(str) {
//     var result = [];
//     var tmp = str.split("\n");

//     for (var i = 0; i < tmp.length; ++i) {
//         result[i] = tmp[i].split(',');
//     }
//     return result;
// }

window.onload = () => {
  new Vue({
    el: "#tableApp",
    data: {
      tableData: []
    },
    methods: {
      getCSV: function() {
        var req = new XMLHttpRequest();
        req.open(
          "get",
          "http://www.mn.cis.iwate-u.ac.jp/~nakaya/report/Data.csv",
          true
        );
        req.send(null);

        req.onload = function() {
          this.convertCSVtoArray(req.responseText);
        };
      },
      convertCSVtoArray: function(str) {
        var tmp = str.split("\n");
        for (var i = 0; i < tmp.length; ++i) {
          tableData[i] = tmp[i].split(",");
        }
      }
    },
    created: function() {
      this.getCSV();
    }
  });
};
