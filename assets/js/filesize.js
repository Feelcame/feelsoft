function addFileSizesToLinks(containerId) {
    // Находим div по его id
    let container = document.getElementById(containerId);
    if (!container) {
        console.error("Контейнер с id '" + containerId + "' не найден.");
        return;
    }

    // Находим все ссылки внутри указанного div
    let links = container.getElementsByTagName("a");
    let linksCount = links.length;

    for (let i = 0; i < linksCount; i++) {
        // Используем let для каждого элемента, чтобы область видимости была ограничена итерацией
        let linkElement = links[i];
        let hrefValue = linkElement.getAttribute("href");

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
                    // Создание элемента <span> с классом size
                    const sizeSpan = document.createElement("span");
                    sizeSpan.className = "size";
                    sizeSpan.textContent = ` (${sizeInMegabytes} MB)`;
                    // Вставка <span> сразу после ссылки
                    if (linkElement.nextSibling) {
                        linkElement.parentNode.insertBefore(sizeSpan, linkElement.nextSibling);
                    } else {
                        linkElement.parentNode.appendChild(sizeSpan);
                    }
                }
            })
            .catch(() => {
                // Обрабатываем ошибки, если файл недоступен
                let errorText = document.createTextNode(" (размер неизвестен)");
                linkElement.parentNode.insertBefore(errorText, linkElement.nextSibling);
            });
    }
}

// Вызов функции с id вашего div
addFileSizesToLinks("filelist");
