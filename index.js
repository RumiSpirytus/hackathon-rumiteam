const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config();
app.use(cors())

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const azureApiKey = process.env.AZURE_OPENAI_API_KEY;

const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Does Azure OpenAI support customer managed keys?" },
    { role: "assistant", content: "Yes, customer managed keys are supported by Azure OpenAI" },
    { role: "user", content: "Do other Azure AI services support this too" },
];

app.get('/', async (req, res) => {
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
    const deploymentId = process.env.MODEL;
    const result = await client.getChatCompletions(deploymentId, messages);

    res.json(result.choices[0])
})

app.listen(3000)