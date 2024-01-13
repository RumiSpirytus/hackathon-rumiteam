const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const pdfParse = require('pdf-parse')

require('dotenv').config();

const port = 3000
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload())

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const azureApiKey = process.env.AZURE_OPENAI_API_KEY;
const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
const deploymentId = process.env.MODEL;

app.post('/generate-questions', async (req, res) => {
    var doc = ``;
    if (!req.files && !req.files.pdfFile) {
        res.status(400);
        res.end();
    }

    pdfParse(req.files.pdfFile).then(async (r) => {
        doc = r.text
        const messages1 = [
            { role: "user", content: `"${doc}".Generate 10 questions based on this document` },
        ];
        const result = await client.getChatCompletions(deploymentId, messages1);
        res.json(result.choices[0].message.content)
    });


})


app.post('/summary-document', async (req, res) => {
    var doc = ``;
    if (!req.files && !req.files.pdfFile) {
        res.status(400);
        res.end();
    }

    pdfParse(req.files.pdfFile).then(async (r) => {
        doc = r.text
        const messages2 = [
            { role: "user", content: `"${doc}".Summary this video for me ? ` },
        ]
        const result = await client.getChatCompletions(deploymentId, messages2);
        res.json(result.choices[0].message.content)
    });

})


app.post("/extract-text", (req, res) => {
    if (!req.files && !req.files.pdfFile) {
        res.status(400);
        res.end();
    }

    pdfParse(req.files.pdfFile).then(result => {
        doc = result.text
        res.send(result.text);
    });
});


app.listen(port, () => {
    console.log(`App listening on port ${port} `)
})