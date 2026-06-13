const notes =
document.getElementById(
"notes"
);

const result =
document.getElementById(
"result"
);

const charCount =
document.getElementById(
"charCount"
);

const wordCount =
document.getElementById(
"wordCount"
);

const historyDiv =
document.getElementById(
"history"
);

notes.addEventListener(

"input",

()=>{

charCount.innerText=

notes.value
.length;

}

);

document
.getElementById(
"fileInput"
)

.addEventListener(

"change",

(e)=>{

const file=

e.target.files[0];

if(!file)
return;

const reader=

new FileReader();

reader.onload=

()=>{

notes.value=

reader.result;

charCount.innerText=

notes.value
.length;

};

reader.readAsText(
file
);

}

);

async function summarize(){

const text=

notes.value
.trim();

if(!text){

alert(
"Enter notes"
);

return;

}

result.innerHTML=

"Summarizing...";

try{

const response=

await fetch(

" https://ai-note-summarizer-1.onrender.com",

{

method:
"POST",

headers:{

"Content-Type":
"application/json"

},

body:

JSON.stringify({

text:text

})

}

);

const data=

await response.json();

if(
!data.summary
){

throw new Error();

}

result.innerHTML=

data.summary;

wordCount.innerText=

data.summary
.split(/\s+/)
.length;

saveHistory(
data.summary
);

}

catch{

result.innerHTML=

"Connection error";

}

}

function copySummary(){

navigator
.clipboard
.writeText(

result.innerText

);

alert(
"Copied"
);

}

function downloadSummary(){

const blob=

new Blob(

[result.innerText],

{

type:
"text/plain"

}

);

const link=

document
.createElement(
"a"
);

link.href=

URL
.createObjectURL(
blob
);

link.download=

"summary.txt";

link.click();

}

function toggleTheme(){

document.body
.classList
.toggle(
"dark"
);

}

function clearAll(){

notes.value="";

result.innerHTML=

"Summary appears here";

charCount.innerText=0;

wordCount.innerText=0;

}

function saveHistory(summary){

let history=

JSON.parse(

localStorage
.getItem(
"history"
)

||

"[]"

);

history.unshift(
summary
);

localStorage
.setItem(

"history",

JSON.stringify(
history
)

);

showHistory();

}

function showHistory(){

let history=

JSON.parse(

localStorage
.getItem(
"history"
)

||

"[]"

);

historyDiv.innerHTML=

history

.map(

item=>

`<p>${item}</p>`

)

.join(
"<hr>"
);

}

function clearHistory(){

localStorage
.removeItem(
"history"
);

showHistory();

}

showHistory();


