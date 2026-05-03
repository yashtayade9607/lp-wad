const Products = [
    {
        img: "https://via.placeholder.com/80",
        name: "Watch",
        price: 2000,
        desc: "Smart Watch for Smart Guys ",
    },
    {
        img: "https://via.placeholder.com/80",
        name: "Hair Dryer",
        price: 2040,
        desc: "Smart Dryer for Smart Dumb",
    },
    {
        img: "https://via.placeholder.com/80",
        name: "pen",
        price: 4000,
        desc: "Smart Pen for Smart Dog ",
    },
    {
        img: "https://via.placeholder.com/80",
        name: "bat",
        price: 10000,
        desc: "Smart Bat  for RCB Fans",
    },

];


// add more records for pagination dmeo 
function addRecords()
{
    for (let i = 5; i <= 25; i++)
    {
        Products.push(
            {
                img: "https://via.placeholder.com/80",
                name: "product " + i,
                price: i * 1000 + 10,
                desc: "Product Description no : " + i,
            }
        );
    }

}
addRecords();


let current_page = 1;
const rowperpage = 10;

function displayProducts()
{
    const start = (current_page - 1) * 10;
    const end = start + rowperpage;
    const container = document.getElementById("list");

    const data = Products.slice(start, end);

    container.innerHTML = data.map(p => (
        `
         <tr>
                <td>
                   <img src="${p.img}"  alt="${p.name}"> 
                </td> 
                <td>
                    ${p.name}
                </td> 
                <td>
                    ${p.price}
                </td> 
                <td>
                    ${p.desc}
                </td> 
         </tr>
        `
    )).join('');
}
displayProducts();


function backPage()
{
    if (current_page > 1)
    {
        current_page--;
    }
    displayProducts();
}

function nextPage()
{
    if (current_page < Math.ceil(Products.length / rowperpage))
    {
        current_page++;
        displayProducts();
    }
}
