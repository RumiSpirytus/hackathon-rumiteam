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

const doc = `Title: Exploring the Impact of Artificial Intelligence on Healthcare

Abstract:
This document aims to investigate the growing influence of artificial intelligence (AI) on the healthcare industry. As AI technologies continue to advance, their applications in healthcare are becoming increasingly significant. The document will delve into various aspects, including the benefits, challenges, and ethical considerations associated with the integration of AI in healthcare.

1. Introduction:
The introduction provides an overview of the rapid developments in AI and its potential to revolutionize healthcare. It outlines the motivation behind exploring this topic and sets the context for the document.

2. Applications of AI in Healthcare:
This section discusses the diverse applications of AI in healthcare, ranging from diagnostic tools and personalized medicine to predictive analytics and robotic surgery. Real-world examples and case studies illustrate the practical impact of AI in improving patient outcomes and streamlining medical processes.

3. Benefits of AI in Healthcare:
Highlighting the advantages, this section explores how AI contributes to faster and more accurate diagnoses, personalized treatment plans, and improved overall patient care. It also discusses the potential cost savings and efficiency gains associated with AI implementation.

4. Challenges and Concerns:
Examining the flip side, this section addresses the challenges and concerns surrounding the integration of AI in healthcare. Issues such as data privacy, algorithm bias, and the need for regulatory frameworks are discussed to provide a comprehensive understanding of the potential pitfalls.

5. Ethical Considerations:
Delving into the ethical implications, this section explores the responsibilities of stakeholders in ensuring that AI technologies in healthcare are deployed ethically. It discusses issues related to transparency, accountability, and the potential impact on the doctor-patient relationship.

6. Future Directions and Emerging Trends:
Looking ahead, this section explores the future directions of AI in healthcare and identifies emerging trends. It considers the possibilities of AI-driven preventive care, continuous monitoring, and the integration of AI with other cutting-edge technologies.

7. Conclusion:
Summarizing the key findings, the conclusion emphasizes the transformative potential of AI in healthcare while acknowledging the need for a balanced approach that addresses the associated challenges and ethical considerations.

`

const messages1 = [
    { role: "user", content: `"${doc}".Generate 10 questions based on this document` },
];

const messages2 = [
    { role: "user", content: `"${doc}".Summary this video for me ? ` },
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
    console.log(`App listening on port ${port} `)
})