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

const doc = `Welcome to our first newsletter of 2017! It's
been a while since the last one, and a lot has
happened. We promise to keep them coming
every two months hereafter, and permit
ourselves to make this one rather long. The
big news is the beginnings of our launch in
the American market, but there are also
interesting updates on sales, development,
mentors and (of course) the investment
round that closed in January.
New capital: The investment round was
successful. We raised 2.13 MNOK to match
the 2.05 MNOK loan from Innovation
Norway. Including the development
agreement with Filmlance International, the
total new capital is 5 MNOK, partly tied to
the successful completion of milestones. All
formalities associated with this process are
now finalized.
New owners: We would especially like to
warmly welcome our new owners to the
Drylab family: Unni Jacobsen, Torstein Jahr,
Suzanne Bolstad, Eivind Bergene, Turid Brun,
Vigdis Trondsen, Lea Blindheim, Kristine`

const messages1 = [
    { role: "user", content: `"${doc}". Generate 10 questions based on this document` },
];

const messages2 = [
    { role: "user", content: `"${doc}". Summary this Document for me ?` },
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