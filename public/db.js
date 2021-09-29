let db;

const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function (event) {
 const db = event.target.result;

 const budgetStore = db.createObjectStore("Budget", { autoIncrement: true, });

 budgetStore.createIndex("name", "name");
 budgetStore.createIndex("date", "date");
 budgetStore.createIndex("value", "value");
};

request.onsuccess = () => {
  const db = request.result;
  const transaction = db.transaction(["budget"], "readwrite");
  const budgetStore = transaction.objectStore("budget");
  const name = budgetStore.index("name");
  const date = budgetStore.index("date");
  const value = budgetStore.index("value");

  const getCursorRequest = budgetStore.openCursor();
  getCursorRequest.onsuccess = e => {
    const cursor = e.target.result;
    if (cursor) {
      console.log(cursor.value);
      cursor.continue();
    } else {
      console.log("No documents left!");
    }
  };
  

}; 

// request.onsuccess = function (event) {
//   db = event.target.result;

//   if (navigator.onLine) {
//     checkDatabase();
//   }
// };

// request.onerror = function (event) {
// };

// function saveRecord(record) {
//   const transaction = db.transaction(["BudgetStore"], "readwrite");
// }

// function checkDatabase() {
//   // open a transaction on your pending db
//   // access your pending object store
//   // get all records from store and set to a variable

//   getAll.onsuccess = function () {
//     if (getAll.result.length > 0) {
//       fetch('/api/transaction/bulk', {
//         method: 'POST',
//         body: JSON.stringify(getAll.result),
//         headers: {
//           Accept: 'application/json, text/plain, */*',
//           'Content-Type': 'application/json',
//         },
//       })
//         .then((response) => response.json())
//         .then(() => {
//           // if successful, open a transaction on your pending db
//           // access your pending object store
//           // clear all items in your store
//         });
//     }
//   };
// }

// // listen for app coming back online
// window.addEventListener('online', checkDatabase);

  