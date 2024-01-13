// document.getElementById("generateQuestions").addEventListener("click", generateQuestions);
// document.getElementById("summaryDocument").addEventListener("click", summaryDocument);
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


const btn1 = document.getElementById("summaryDocument");
btn1.addEventListener("click", function () {
    btn1.disabled = true;
    chrome.tabs.query({ currentWindow: true, active: true }, function () {
        general("https://hackathon-rumiteam.vercel.app/summary-document")
    });
});

const btn2 = document.getElementById("generateQuestions");
btn2.addEventListener("click", function () {
    btn2.disabled = true;
    chrome.tabs.query({ currentWindow: true, active: true }, function () {
        general("https://hackathon-rumiteam.vercel.app/generate-questions")
    });
});

const inputFile = document.getElementById("inputFile")
const btnUpload = document.getElementById("btnUpload")
const resultText = document.getElementById("resultText")


