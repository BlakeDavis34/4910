function addItemToTable(title, href, index) {
    const tableBody = document.querySelector('#itemsTable tbody');
    const tableRow = document.createElement('tr');
    const titleCell = document.createElement('td');
    const linkCell = document.createElement('td');
    const link = document.createElement('a');
    const delButton = document.createElement('button')
  
    titleCell.textContent = title;
  
    link.href = href;
    link.textContent = "View item on eBay";
    link.target = '_blank';
    linkCell.appendChild(link);

    delButton.textContent = "Remove Item"
    delButton.addEventListener('click', async (e) => {
        console.log("remove event = " + e.target)
        tableRow.remove()

        removeItemFromStorage(index)

        chrome.storage.local.get(["catalogItems"]).then((content) => {
            console.log("After remove = " + JSON.stringify(content))
        })
    })
  
    tableRow.appendChild(titleCell);
    tableRow.appendChild(linkCell);
    tableRow.appendChild(delButton)
    tableBody.appendChild(tableRow);
  }

  function removeItemFromStorage(index) {



    chrome.storage.local.get(["catalogItems"]).then((content) => {

        items = content['catalogItems']

        //content["catalogItems"].splice(index, 1)

        for( var i = items.length - 1 ; i >= 0 ; --i) {
            if (items[i].index == index) {
                items.splice(i, 1)
            }
        }

        console.log("VALUE IN STORAGE = " + JSON.stringify(content))
    })
}

    



//     return new Promise((resolve) => {
        


//       chrome.storage.local.get('items', ({ items }) => {
//         items.splice(index, 1);
//         chrome.storage.local.set({ items }, () => {
//           resolve();
//         });
//       });
//     });
//   }

  
  async function displayItems() {

    chrome.storage.local.get(["catalogItems"]).then((content) => {
        if (content) {
            items = content["catalogItems"]

            items.forEach(({ title, href, index }) => {
              addItemToTable(title, href, index);
            });
          }
    })
  }
  
  displayItems();
  
  
  
  