const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
res.send("Backend Running");
});

app.post("/summarize", async (req, res) => {

try {

const text = req.body.text;

if (!text) {

return res.status(400).json({
error: "No text provided"
});

}

const response = await fetch(
"https://openrouter.ai/api/v1/chat/completions",
{

method: "POST",

headers: {

Authorization:
`Bearer ${process.env.API_KEY}`,

"Content-Type":
"application/json"

},

body: JSON.stringify({

model:
"openai/gpt-4o-mini",

messages: [

{
role: "user",

content:
"Summarize this:\n\n" + text
}

]

})

}

);

const data =
await response.json();

if (
!data.choices
) {

return res
.status(500)
.json(data);

}

res.json({

summary:

data
.choices[0]
.message.content

});

}

catch(error){

console.log(error);

res.status(500).json({

error:
"Connection error"

});

}

});

app.listen(3000, () => {

console.log("Running");

});
