import algoliasearch from 'algoliasearch';

const client = algoliasearch(
    'RNY7K404V3',
    'c8ccc89a8170f2e9a41ec358bbdcf85e'
);

const index = client.initIndex("search");

let data = [];

let resultsRootElement = document.querySelector('.results');

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
        data = json;
    });

document.querySelector('#searchInput').addEventListener('keyup', () => {

    let searchTerm = document.querySelector('#searchInput').value;

    if (String(searchTerm).trim().length > 0) {

        index.search(searchTerm)
            .then(({ hits }) => {
                renderProducts(hits);
            })
            .catch(err => {
                console.log(err);
            });

    } else {
        removeElements();
    }
});


function renderProducts(products) {

    document.querySelectorAll('.result').forEach(prod => {
        prod.remove();
    });

    products.forEach(product => {
        renderSingleProduct(product);
    });
}


function renderSingleProduct(product) {

    let resultDiv = document.createElement('div');
    let resultImage = document.createElement('img');
    let resultTitle = document.createElement('h4');
    let resultPrice = document.createElement('p');
    let purchaseButton = document.createElement('button');

    resultDiv.classList.add('result');

    resultImage.src = product.image;
    resultTitle.innerText = product.title;
    resultPrice.innerText = product.price;
    purchaseButton.innerText = 'Purchase';

    resultDiv.appendChild(resultImage);
    resultDiv.appendChild(resultTitle);
    resultDiv.appendChild(resultPrice);
    resultDiv.appendChild(purchaseButton);

    resultsRootElement.appendChild(resultDiv);
}


function removeElements() {

    document.querySelectorAll('.result').forEach(prod => {
        prod.remove();
    });
}