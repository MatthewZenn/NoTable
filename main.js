const textarea = document.getElementById('editor');
const numbers = document.getElementById("numbers");
const output = document.getElementById('output');
const one = document.getElementById('field1');
const two = document.getElementById('field2');

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
  var column = text.split(/\r?\n/);
  console.log(column);
  output.value = "| "+one.value+" | "+two.value+" | "+one.value+" | "+two.value+" | "+one.value+" | "+two.value+" |\n|----|----|----|----|----|----|";
  for (let i=0; i<column.length; i+=3) {
    var item1 = column[i].split(',');
    var item2 = column[i+1].split(',');
    var item3 = column[i+2].split(',');
    console.log(item2);
    output.value += "\n| "+item1[0]+" | "+item1[1]+" | "+item2[0]+" | "+item2[1]+" | "+item3[0]+" | "+item3[1]+" |";
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
