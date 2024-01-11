const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config();
app.use(cors())
app.use(express.json());


const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const azureApiKey = process.env.AZURE_OPENAI_API_KEY;

const messages = [
    { role: "user", content: "Summary this Document for me !" },
    { role: "user", content: "Generate 10 questions based on this document" },
];

app.get('/generate-questions', async (req, res) => {
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
    const deploymentId = process.env.MODEL;
    const result = await client.getChatCompletions(deploymentId, messages[0]);

    res.json(result.choices[0])
})

app.get('/summary-document', async (req, res) => {
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
    const deploymentId = process.env.MODEL;
    const result = await client.getChatCompletions(deploymentId, messages[1]);

    res.json(result.choices[0])
})
app.listen(3000)

