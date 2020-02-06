function CSVtoArray(rawCSV) {
  var result = [];

  var tmpData = rawCSV.split("\n");

  for (var i = 0; i < tmpData.length; ++i) {
    result[i] = tmpData[i].split(",");
  }

  return result;
}

function computeScore(array) {
  var sumScore = 0.0;
  for (let i = 3; i < 8; i++) sumScore += parseFloat(array[i]);
  return [sumScore / 5.0, sumScore];
}

function generateLine(array) {
  var outArray = array;
  var [avg, sum] = computeScore(array);
  outArray.push(avg);
  outArray.push(sum);
  return outArray;
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
      MiniMax: [],
      grade: 0,
      textFilter: "",
      addLineData: []
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
      },
      toggleClass: function() {
        this.grade = (this.grade + 1) % 4;
        if (this.grade === 0) this.grade = "";
        this.textFilter = this.grade.toString();
      },
      addLine: function() {
        if (this.addLineData.some(el=>!!el)){//el=>!!elで配列中にnullがあるかチェック
          this.rank.push(generateLine(this.addLineData));
          this.addLineData = [];
        }else{
          alert('不正な入力：入力していない部分があります。')
        }
      }
    },
    computed: {
      findMiniMax: function() {
        let array;
        if (this.textFilter) {
          array = this.rank.filter(value => {
            return value.indexOf(this.textFilter) > -1;
          }, this);
        } else {
          array = this.rank;
        }
        let minArray = ["最小値", "", ""];
        let maxArray = ["最大値", "", ""];
        let sumArray = ["平均値", "", ""];
        for (let i = 3; i < 8; i++) {
          let min = 100;
          let max = 0;
          let sum = 0;
          for (let j = 0; j < array.length; j++) {
            if (max < array[j][i]) max = array[j][i];
            if (min > array[j][i]) min = array[j][i];
            sum += parseInt(array[j][i],10);
          }
          minArray.push(min);
          maxArray.push(max);
          sumArray.push(Math.round(sum/array.length));
        }
        return [maxArray, minArray,sumArray];
      },
      findFilter: function() {
        if (this.textFilter) {
          return this.rank.filter(value => {
            return value.indexOf(this.textFilter) > -1;
          }, this);
        } else {
          return this.rank;
        }
      }
    },
    mounted: function() {
      var tmpArray = [];
      axios
        .get("http://www.mn.cis.iwate-u.ac.jp/~nakaya/report/Data.csv")
        .then(response => (tmpArray = CSVtoArray(response.data)))
        .then(() => {
          this.header = tmpArray[0];
          this.header.push("平均点", "合計点");
          for (var i = 1; i < tmpArray.length - 1; i++)
            this.rank.push(generateLine(tmpArray[i]));
        });
    }
  });
};
