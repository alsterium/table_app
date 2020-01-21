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
    then: function (resolve) {
      var req = new XMLHttpRequest();
      var result = [];
      req.open("get", url, true);
      req.send(null);

      req.onload = function () {
        result = CSVtoArray(req.responseText);
      }
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
      tableData: []
    },
    mounted: function () {
      axios.get("http://www.mn.cis.iwate-u.ac.jp/~nakaya/report/Data.csv")
        .then(response => this.tableData = CSVtoArray(response.data));
    }
  })
}

