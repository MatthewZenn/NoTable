const textarea = document.getElementById('editor');
const numbers = document.getElementById("numbers");
const output = document.getElementById('output');
const one = document.getElementById('field1');
const numb = document.getElementById('field2');

var i = 0;
var keys = [];
var date = [];

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
  var input = textarea.value;
  var result = [...input].reduce((acc, chr) => { 
    acc[chr] = (acc[chr] || 0) + 1;
    return acc;
  }, {});
  
  console.log('Result:', result)
  for(var key in result) {
    if (result.hasOwnProperty(key)){
      keys.push(key);
      date.push(result[key])
    }
  }
  for (l=0;l<keys.length;l++) {
    output.value += keys[l] +" "+date[l]+"\n";
  }
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
