function addFileSizesToLinks(containerId) {
    // Находим div по его id
    var container = document.getElementById(containerId);
    if (!container) {
        console.error("Контейнер с id '" + containerId + "' не найден.");
        return;
    }

    // Находим все ссылки внутри указанного div
    var links = container.getElementsByTagName("a");
    var linksCount = links.length;

    for (var i = 0; i < linksCount; i++) {
        var linkElement = links[i];
        var hrefValue = linkElement.getAttribute("href");

        // Пропускаем пустые ссылки
        if (!hrefValue || hrefValue === "#") {
            continue;
        }
		
        // Проверяем, заканчивается ли ссылка на ".apk"
        if (!hrefValue.endsWith(".apk")) {
            continue;
		}
        // Получаем размер файла через fetch
        fetch(hrefValue)
            .then(response => {
                // Проверка HTTP статуса ответа
                if (response.status === 404) {
                    console.warn(`Файл ${hrefValue} не найден (404).`);
                    return;
                }

                const sizeInBytes = response.headers.get("content-length");
                if (sizeInBytes) {
                    // Конвертация размера в мегабайты с округлением до сотых
                    const sizeInMegabytes = (sizeInBytes / (1024 * 1024)).toFixed(2);
                    // Добавляем размер файла рядом с текстом ссылки
                    const sizeText = document.createTextNode(` (${sizeInMegabytes} MB)`);
                    linkElement.parentNode.insertBefore(sizeText, linkElement.nextSibling);
                }
            })
            .catch(() => {
                // Обрабатываем ошибки, если файл недоступен
                var errorText = document.createTextNode(" (размер неизвестен)");
                linkElement.parentNode.insertBefore(errorText, linkElement.nextSibling);
            });
    }
}

// Вызов функции с id вашего div
addFileSizesToLinks("filelist");