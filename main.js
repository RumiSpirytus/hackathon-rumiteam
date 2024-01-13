document.getElementById("generateQuestions").addEventListener("click", generateQuestions);
document.getElementById("summaryDocument").addEventListener("click", summaryDocument);
async function generateQuestions() {
    const response = await fetch("http://localhost:3000/generate-questions", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const result = await response.json()
    console.log(result);
    console.log("Here are yours 10 questions based on this document!");
}


async function summaryDocument() {
    const response = await fetch("http://localhost:3000/summary-document", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const result = await response.json()
    console.log(result);
    console.log("This is the summary about this document");
}

const inputFile = document.getElementById("inputFile")
const btnUpload = document.getElementById("btnUpload")
const resultText = document.getElementById("resultText")

btnUpload.addEventListener("click", () => {
    const file = inputFile.files[0]
    const formData = new FormData()
    formData.append("pdfFile", file)
    fetch("http://localhost:3000/extract-text", {
        method: "POST",
        body: formData
    }).then(response => response.text())
        .then(extractedText => {
            resultText.value = extractedText.trim()
        })
})