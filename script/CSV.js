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

function get(url) {
  return {
    then: function(resolve){ var req = new XMLHttpRequest();
      var result = [];
      req.open("get", url, true);
      req.send(null);
  
      req.onload = function() {
        //   this.convertCSVtoArray(req.responseText);
        var tmp = req.responseText.split("\n");
  
        for (var i = 0; i < tmp.length; ++i) {
          result[i] = tmp[i].split(",");
        }
        resolve(result);}
    }
  };
}

var testarray = [];

window.onload = () => {
  new Vue({
    el: "#tableApp",
    data: {
      tableData: undefined
    },
    methods: {
      getCSV: function() {
        get("http://www.mn.cis.iwate-u.ac.jp/~nakaya/report/Data.csv").then(
          function(res) {
            this.tableData = _.cloneDeep(res);
            console.log(this.tableData);
          }
        );
        // this.tableData = [1,2,3,4];
      },
      showData: function() {
        console.log(this.tableData);
      }
    },
    created: function() {
      this.getCSV();
    }
  });
};
