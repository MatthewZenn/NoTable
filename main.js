const textarea = document.getElementById('editor');
const numbers = document.getElementById("numbers");
const output = document.getElementById('output');

document.getElementById('copy').addEventListener('click', function() {
  navigator.clipboard.writeText(document.getElementById("editor").value);
});

document.getElementById('convert').addEventListener('click', function() {
  output.value = '';
  var text = textarea.value;   
  var colum2 = text.split(/\r?\n/);
  var colum1 = colum2.splice(0, Math.ceil(colum2.length/2))
  output.value = "| Lanuage | Status | Language | Status |\n|----|----|----|----|";
  for (let i=0; i<colum1.length; i++) {
    var item1 = colum1.shift().split(',');
    var item2 = colum2.shift().split(',');
    output.value += "\n| "+item1[0]+" | "+item1[1]+" | "+item2[0]+" | "+item2[1]+" | ";
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
