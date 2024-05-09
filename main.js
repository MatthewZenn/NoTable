const textarea = document.getElementById('editor');
const numbers = document.getElementById("numbers");

document.getElementById('convert').addEventListener('click', function() {
  var text = textarea.value;   
  var lines = text.split(/\r?\n/);
  textarea.value = lines;
  var count = lines.length;
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
