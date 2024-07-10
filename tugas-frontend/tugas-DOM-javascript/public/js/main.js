var items = [
  [
    '001',
    'Keyboard Logitek',
    60000,
    'Keyboard yang mantap untuk kantoran',
    'logitek.jpg',
  ],
  ['002', 'Keyboard MSI', 300000, 'Keyboard gaming MSI mekanik', 'msi.jpg'],
  [
    '003',
    'Mouse Genius',
    50000,
    'Mouse Genius biar lebih pinter',
    'genius.jpeg',
  ],
  ['004', 'Mouse Jerry', 30000, 'Mouse yang disukai kucing', 'jerry.jpg'],
];

function loadItems(items) {
  const listBarang = document.getElementById('listBarang');
  listBarang.innerHTML = '';
  items.forEach((item) => {
    const cardItem = `
                <div class="col-4 mt-2">
                    <div class="card" style="width: 18rem;">
                        <img src="public/img/${item[4]}" class="card-img-top" height="200px" width="200px" alt="${item[1]}">
                        <div class="card-body">
                            <h5 class="card-title" id="itemName">${item[1]}</h5>
                            <p class="card-text" id="itemDesc">${item[3]}</p>
                            <p class="card-text">Rp ${item[2]}</p>
                            <a href="#" class="btn btn-primary" id="addCart">Tambahkan ke keranjang</a>
                        </div>
                    </div>
                </div>
            `;
    listBarang.innerHTML += cardItem;
  });
}

document.addEventListener('DOMContentLoaded', () => loadItems(items));

document.getElementById('formItem').addEventListener('submit', (event) => {
  event.preventDefault();
  const keyword = document.getElementById('keyword').value.toLowerCase();
  const filteredItems = items.filter((item) =>
    item[1].toLowerCase().includes(keyword)
  );
  loadItems(filteredItems);
});
