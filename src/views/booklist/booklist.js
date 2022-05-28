const bookTitle = document.querySelector('.bookTitle span');
const bookAuthor = document.querySelector('.bookAuthor span');
const bookPrice = document.querySelector('.bookPrice span');
const bookDescription = document.querySelector('.bookDescription span');
const bookImg = document.querySelector('.bookImg img');

const getBookInfo = async function(){
    const res = await fetch('./booklist.json');
    const data = await res.json()
    const { name, author, price, information, imgUrl } = data;
    bookTitle.innerHTML = `<a href="/bookdetail">${name}</a>`;
    bookAuthor.innerText = author;
    bookPrice.innerText = price;
    bookDescription.innerText = information;
    bookImg.setAttribute('src', imgUrl);
}

getBookInfo();






export default getBookInfo;


