function removeUnwantedChars(text) {
    return text.replace('<', ' ')
                .replace('>', ' ')
                .replace('[', ' ')
                .replace(']', ' ')
                .replace(':', ' ');
}

function replaceInputDelimitersAndSplit(text) {
    return text.replace(' ', "\n")
                .replace(',', "\n")
                .replace(';', "\n")
                .split("\n");
}

function isEmail(string) {
    return string.includes('@');
}

function saveEmailsToExcel(stringArray) {
    var ep = new ExcelPlus();
    ep.createFile();
    var i = 0;
    stringArray.forEach(function(line) {
        if(isEmail(line)) {
            ep.writeRow(++i, [line]);
        }
    });
    var d = new Date();
    var dateTimeString = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + '-' + d.getHours() + '-' + d.getMinutes();
    ep.saveAs('excel_' + dateTimeString + '.xlsx');
}

document.addEventListener("DOMContentLoaded", function(event) {
    var textArea = document.querySelector('#inputArea');
    var submitButton = document.querySelector('#submit');
    submitButton.addEventListener('click', function(e) {
        var textAreaContent = textArea.value;
        var stringArray = replaceInputDelimitersAndSplit(removeUnwantedChars(textAreaContent));
        saveEmailsToExcel(stringArray);
    });
});

