async function getData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = response.json();
    return data
}

async function main() {
    const data = await getData();
    let currentPage = 1;
    let rows = 10;

    function displayList(arrData, rowPerPage, page) {
        const posts = document.querySelector('.posts');
        posts.innerHTML = "";
        page--;
        const start = rowPerPage * page;
        const end = start + rowPerPage;
        const paginatedData = arrData.slice(start, end);
        paginatedData.forEach((el) => {
            const postEl = document.createElement("div");
            postEl.classList.add("post");
            const postUserId = document.createElement("div");
            postUserId.classList.add('post__userId');
            postUserId.innerHTML = 'UserId: '.bold()+`${el.userId}`;
            postEl.appendChild(postUserId);
            const postId = document.createElement("div");
            postId.classList.add('post__id');
            postId.innerHTML = 'Id: '.bold()+`${el.id}`;
            postEl.appendChild(postId);
            const posttitle = document.createElement("div");
            posttitle.classList.add("post__title");
            posttitle.innerHTML = 'Title: '.bold() +`${el.title}`;
            postEl.appendChild(posttitle);
            const postbody = document.createElement("div");
            postbody.classList.add('post__body');
            postbody.innerHTML = 'Body: '.bold()+`${el.body}`;
            postEl.appendChild(postbody)
            posts.appendChild(postEl);

        })
    }
    function displayPagination(arrData, rowPerPage) {
        const pagEl = document.querySelector('.pagination');
        const pagesCount = Math.ceil(arrData.length / rowPerPage);
        const ulEl = document.createElement("ul");
        ulEl.classList.add('pagination__list');
        for (let i =0; i < pagesCount; i++){
            const liEl = displayPaginationBtn(i+1);
            ulEl.appendChild(liEl);
        }
        pagEl.appendChild(ulEl);
    }
    function displayPaginationBtn(page) {
        
        const liEl = document.createElement("li");
        liEl.classList.add('pagination__item');
        liEl.innerHTML = page;
        if (currentPage == page) {
            liEl.classList.add('pagination__active')
        }
        liEl.addEventListener('click', () => {
            currentPage = page;
            displayList(data,rows, currentPage)

            let currentLiItem = document.querySelector('li.pagination__active');
            currentLiItem.classList.remove('pagination__active');
            liEl.classList.add('pagination__active');
        })

        
        return liEl
    }
    displayList(data, rows, currentPage);
    displayPagination(data, rows);
}

main();