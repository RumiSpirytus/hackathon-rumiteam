chrome.runtime.onMessage.addListener(
    function (data, sender, sendResponse) {
        console.log(data);
        if (data.action === "convertToText") {
            // Thực hiện quét toàn bộ trang web thành văn bản ở đây
            // var pageText = document.body.innerText;
            // Gửi văn bản đã chuyển đổi về popup.js để xử lý hoặc hiển thị
            sendResponse({ action: "convertedText", text: "pageText" });
        }
    }
);
