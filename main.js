const textarea = document.getElementById('editor');
const numbers = document.getElementById("numbers");
const output = document.getElementById('output');
const one = document.getElementById('field1');
const numb = document.getElementById('field2');
const ctx = document.getElementById('graph');

var i = 0;
var keys = [];
var date2 = [];
var date = [];
var sum = 0;

var graph = new Chart();

document.getElementById('copy').addEventListener('click', function() {
  navigator.clipboard.writeText(document.getElementById("output").value);
});

document.getElementById('clear').addEventListener('click', function() {
  textarea.value = '';
  output.value = '';
});

document.getElementById('convert').addEventListener('click', function() {
  output.value = '';
  var text = textarea.value;   
  var labels = one.value;
  var column = text.split(/\r?\n/);
  var title = labels.split(',');
  output.value = "| " + ((title[0]+" | "+title[1]+" | " ).repeat(numb.value))+ "\n|" + ("----|".repeat(numb.value*2)) + "\n";
  for (i=0; i<column.length; i+=Number(numb.value)) {
    for (let j=i; j<i+Number(numb.value); j++) {
      console.log(column[j])
      var item = column[j].split(',');
      output.value += item[0]+" | "+item[1]+" | "
    }
    output.value += "\n| ";
    console.log(i);
  }
});

document.getElementById('analyze').addEventListener('click', function() {
  output.value = '';
  date = [];
  keys = [];
  date2 = [];
  i = 0;
  graph.destroy();
  sum = 0

  var input = textarea.value;
  input = String(input).toLowerCase();
  var unordered = [...input].reduce((acc, chr) => { 
    acc[chr] = (acc[chr] || 0) + 1;
    return acc;
  }, {});

  ['.', ' ' ,',', '"', '!', '\n', ' '].forEach(e => delete unordered[e]);

  var result = Object.keys(unordered).sort().reduce(
    (obj, key) => { 
      obj[key] = unordered[key]; 
      return obj;
    }, 
    {}
  );

  for(var key in result) {
    if (result.hasOwnProperty(key)){
      keys.push(key);
      date2.push(Number(result[key]));
    }
  }

  sum = date2.reduce((a, b) => a + b, 0);
  for (let p=0; p<date2.length; p++) {
    date.push((date2[p]/sum)*100);
  }

  for (l=0;l<keys.length;l++) {
    output.value += keys[l]+','+date[l]+'\n';
  }

  graph = new Chart(ctx, {
    data: {
      datasets: [{
          type: 'bar',
          label: one.value,
          data: date,
          backgroundColor: 'rgba(153, 102, 255, 0.75)',
          borderColor: 'rgb(153, 102, 255)'
      }, {
          type: 'bar',
          label: 'Average Character Weights',
          data: [8.2,1.5,2.8,4.3,12.7,2.2,2.0,6.1,7.0,0.15,0.77,4.0,2.4,6.7,7.5,1.9,0.095,6.0,6.3,9.1,2.8,0.98,2.4,0.15,2.0,0.074],
          backgroundColor: 'rgba(54, 162, 235, 0.75)',
          borderColor: 'rgb(54, 162, 235)'
      }],
      labels: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false
          },
        },
        x: {
          grid: {
            display: false,
          }
        }
      }
    }
  });
});

textarea.addEventListener("keyup", (e) => {
  const num = e.target.value.split("\n").length;
  numbers.innerHTML = Array(num).fill("<span></span>").join("");
  
});

textarea.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    textarea.value =
      textarea.value.substring(0, start) +
      "\t" +
      textarea.value.substring(end);
    event.preventDefault();
  }
});