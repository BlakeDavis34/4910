let selectedItems = []
idIter = 0

function addButtonToDiv(div) {
    const button = document.createElement('button');
    button.innerText = 'Add to Catalog';
    button.addEventListener('click', async () => {
        const targetChild = div.querySelector('.s-item__info.clearfix');

        if(targetChild){

            const targetAnchor = targetChild.querySelector('.s-item__link')

            if(targetAnchor){

                const href = targetAnchor.href

                const title = targetAnchor.querySelector('.s-item__title').querySelector('span[role="heading"]').textContent

                if(title){

                    // chrome.storage.local.get('catalogItems', ({ items }) => {
                    //     items = items || [];
                    //     items.push({ title, href });
                    //     console.log("IM STORING " + JSON.stringify(items))
                    //     chrome.storage.local.set({ items });
                    // });
                    // await saveItemToStorage(title, href)

                    // chrome.storage.local.get('catalogItems', ({ testItems }) => {
                    //     console.log("STORED = " + JSON.stringify(testItems))
                    // });

                    selectedItems.push({title, href, idIter})
                    idIter++

                    chrome.storage.local.set({ 'catalogItems':selectedItems }).then(() => {
                        console.log("Value is set to " + JSON.stringify(selectedItems));
                    });

                    chrome.storage.local.get(["catalogItems"]).then((content) => {
                        console.log("VALUE IN STORAGE = " + JSON.stringify(content))
                    })
                      
                    //   chrome.storage.local.get(catalogItems).then((result) => {
                    //     console.log("Value currently is " + result.key);
                    //   });

                } else {
                    console.log("Couldn't find title and link")
                    alert("Error adding item. Please refresh the page.")
                }

                console.log("title = " + title)
            } else {
                console.log("anchor not found...")
            }

        } else {
            console.log('target not found')
        }
    
        console.log("Item added!")
    });
    div.appendChild(button);
  }

  function saveItemToStorage(item) {
    return new Promise((resolve) => {
      chrome.storage.local.get('catalogItems', ({ items }) => {
        items = items || [];
        items.push(item);
        chrome.storage.local.set({ items }, () => {
          resolve();
        });
      });
    });
  }
  
  function addButtonToAllDivs() {
    const targetDivs = document.querySelectorAll('.s-item__wrapper.clearfix');
    targetDivs.forEach((div) => {
      addButtonToDiv(div);
    });
  }
  
  addButtonToAllDivs();