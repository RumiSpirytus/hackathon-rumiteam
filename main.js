document.getElementById("generateQuestions").addEventListener("click", generateQuestions);
document.getElementById("summaryDocument").addEventListener("click", summaryDocument);

const inputFile = document.getElementById("inputFile")
const btnUpload = document.getElementById("btnUpload")
const resultText = document.getElementById("resultText")

function general(link) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';
    const file = inputFile.files[0]
    const formData = new FormData()
    formData.append("pdfFile", file)

    fetch(link, {
        method: "POST",
        body: formData
    }).then(response => response.json())
        .then(summaryText => {
            resultText.value = summaryText.trim()
            loadingIndicator.style.display = 'none';
        })
}

async function generateQuestions() {
    general("https://hackathon-rumiteam.vercel.app/generate-questions")
}


async function summaryDocument() {
    general("https://hackathon-rumiteam.vercel.app/summary-document")
}