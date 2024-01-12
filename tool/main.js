// document.getElementById("generateQuestions").addEventListener("click", generateQuestions);
// document.getElementById("summaryDocument").addEventListener("click", summaryDocument);

const btn1 = document.getElementById("summaryDocument");
btn1.addEventListener("click", function () {
    btn1.disabled = true;
    chrome.tabs.query({ currentWindow: true, active: true }, function () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/summary-document", true);
        xhr.onload = function () {
            var text = xhr.responseText;
            const summaryDocument = document.getElementById("page");
            summaryDocument.innerHTML = text;
            btn1.disabled = false;
            btn1.innerHTML = "Summarise Document";
        }
        xhr.send();
    });
});

const btn2 = document.getElementById("generateQuestions");
btn2.addEventListener("click", function () {
    btn2.disabled = true;
    chrome.tabs.query({ currentWindow: true, active: true }, function () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/generate-questions", true);
        xhr.onload = function () {
            var text = xhr.responseText;
            const summaryDocument = document.getElementById("page");
            summaryDocument.innerHTML = text;
            btn2.disabled = false;
            btn2.innerHTML = "Generate Questions";
        }
        xhr.send();
    });
});

