// Mengambil data kamus dari file JSON menggunakan Fetch API
fetch("/assets/api/indo-tte.json")
    .then((response) => response.json())
    .then((data) => {
        // Memproses data kamus
        for (let alfabet in data) {
            let kamus = data[alfabet];
            if (kamus.length > 0) {
                let kamusElement = document.createElement("div");

                let table = document.createElement("table");
                table.classList.add("table", "table-bordered", "mb-4", "table-striped");

                let tableHead = document.createElement("thead");
                tableHead.classList.add("table-dark");
                let headRow = document.createElement("tr");
                let headKata = document.createElement("th");
                headKata.innerText = "Ternate";
                let headArti = document.createElement("th");
                headArti.innerText = "Indonesia";
                headRow.appendChild(headKata);
                headRow.appendChild(headArti);
                tableHead.appendChild(headRow);

                let tableBody = document.createElement("tbody");

                // Menambahkan data kata dan arti ke tabel
                for (let i = 0; i < kamus.length; i++) {
                    let kata = kamus[i].kata;
                    let arti = kamus[i].arti;

                    let row = document.createElement("tr");
                    let cellKata = document.createElement("td");
                    cellKata.innerText = kata;
                    let cellArti = document.createElement("td");
                    cellArti.classList.add("arti");
                    cellArti.innerText = arti;
                    row.appendChild(cellKata);
                    row.appendChild(cellArti);
                    tableBody.appendChild(row);
                }

                table.appendChild(tableHead);
                table.appendChild(tableBody);

                kamusElement.innerHTML = `<h2 class="fw-bold">${alfabet}</h2>`;
                kamusElement.appendChild(table);

                // Menambahkan kamusElement ke dalam kontainer
                document.getElementById("kamus-container").appendChild(kamusElement);
            }
        }

        // Menangani peristiwa input pada input pencarian
        let searchInput = document.getElementById("search-input");
        searchInput.addEventListener("input", function () {
            let searchTerm = searchInput.value.toLowerCase();

            // Memfilter dan menampilkan hanya alfabet yang memiliki data sesuai dengan pencarian
            let kamusElements = document.querySelectorAll("#kamus-container > div");
            for (let i = 0; i < kamusElements.length; i++) {
                let kamusElement = kamusElements[i];
                let rows = kamusElement.querySelectorAll("tbody tr");

                let hasMatch = false;

                for (let j = 0; j < rows.length; j++) {
                    let row = rows[j];
                    let kata = row.querySelector("td:first-child").textContent.toLowerCase();
                    let arti = row.querySelector(".arti").textContent.toLowerCase();

                    if (kata.includes(searchTerm)) {
                        row.style.display = "table-row";
                        hasMatch = true;
                    } else if (arti.includes(searchTerm)) {
                        row.style.display = "table-row";
                        hasMatch = true;
                    } else {
                        row.style.display = "none";
                    }
                }

                if (hasMatch) {
                    kamusElement.style.display = "block";
                } else {
                    kamusElement.style.display = "none";
                }
            }
        });
    })
    .catch((error) => {
        console.error("Terjadi kesalahan:", error);
    });
