const express = require('express')
const cors = require('cors')
require('dotenv').config();

const port = 3000
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const azureApiKey = process.env.AZURE_OPENAI_API_KEY;
const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
const deploymentId = process.env.MODEL;

const messages1 = [
    { role: "user", content: "Summary this Document for me !" },
];

const messages2 = [
    { role: "user", content: "Generate 10 questions based on this document" },
]

app.get('/generate-questions', async (req, res) => {
    const result = await client.getChatCompletions(deploymentId, messages1);
    res.json(result.choices[0].message.content)
})

app.get('/summary-document', async (req, res) => {
    const result = await client.getChatCompletions(deploymentId, messages2);
    res.json(result.choices[0].message.content)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})