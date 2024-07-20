import { Array } from '../models/Array.mjs';
import { LinkedList } from '../models/LinkedList.mjs';
import { Business } from '../models/Business.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const array = new Array();
    const linkedList = new LinkedList();
    const tam=20000;
    document.getElementById('insertArray').addEventListener('click', async () => {
        try {
            console.log('Fetching data for Array...');
            const response = await fetch('../../bussines.json');
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const dataText = await response.text();
            const data = JSON.parse(dataText); 
            array.array = []; 
    
            const startTime = performance.now();
            console.log('Inserting data into Array...');
            for (let x = 0; x < Math.min(tam, data.length); x++) {
                const business = new Business(
                    data[x].business,
                    data[x].name,
                    data[x].address,
                    data[x].city,
                    data[x].state,
                    data[x].postal_code,
                );
                array.push(business);
            }
            const endTime = performance.now();
            const duration = endTime - startTime;
            console.log(`Array insertion time: ${duration.toFixed(2)} milliseconds`);
            const arrayInsertTimeElement = document.getElementById('arrayInsertTime');
            if (arrayInsertTimeElement) {
                arrayInsertTimeElement.textContent = `${duration.toFixed(2)} ms`;
            } else {
                console.error('Element with ID "arrayInsertTime" not found.');
            }
    
            console.log('Array size after insertion:', array.size());
            console.log('First 5 elements in Array:', array.recorrido().slice(0, 5));
    
        } catch (err) {
            console.error('Error in Array insertion:', err);
        }
    });



    
    document.getElementById('insertLinkedList').addEventListener('click', async () => {
        try {
            console.log('Fetching data for LinkedList...');
            const response = await fetch('../../bussines.json');
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
            const dataText = await response.text();
            let data;
            try {
                data = JSON.parse(dataText);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                return;
            }
    
            linkedList.clear(); 
    
            const startTime = performance.now();
            console.log('Inserting data into LinkedList...');
            for (let x = 0; x < Math.min(tam, data.length); x++) {
                const business = new Business(
                    data[x].business,
                    data[x].name,
                    data[x].address,
                    data[x].city,
                    data[x].state,
                    data[x].postal_code,
                );
                linkedList.push(business);
            }
            const endTime = performance.now();
            const duration = endTime - startTime;
            console.log(`LinkedList insertion time: ${duration.toFixed(2)} milliseconds`);
            const linkedListInsertTimeElement = document.getElementById('linkedListInsertTime');
            if (linkedListInsertTimeElement) {
                linkedListInsertTimeElement.textContent = `${duration.toFixed(2)} ms`;
            } else {
                console.error('Element with ID "linkedListInsertTime" not found.');
            }
    
            console.log('LinkedList size after insertion:', linkedList.size());
            console.log('First 5 elements in LinkedList:', linkedList.recorrido().slice(0, 5));
    
        } catch (err) {
            console.error('Error in LinkedList insertion:', err);
        }
    });
    
    

    document.getElementById('searchArray').addEventListener('click', () => {
        const searchValue = document.getElementById('searchArrayInput').value.trim();
        if (searchValue) {
            console.log(`Searching for ID: ${searchValue} in Array...`);
            const startTime = performance.now();
            const result = array.findById(searchValue);
            const endTime = performance.now();
            const duration = endTime - startTime;

            if (result) {
                console.log(`Found in Array: ${JSON.stringify(result)}`);
                updateListDisplay('list-business', `Found: ${result.name}, ID: ${result.business}`);
            } else {
                console.log('No record found in Array.');
                updateListDisplay('list-business', 'No record found.');
            }

            const searchTimeElement = document.getElementById('arraySearchTime');
            if (searchTimeElement) {
                searchTimeElement.textContent = `${duration.toFixed(2)} ms`;
            } else {
                console.error('Element with ID "arraySearchTime" not found.');
            }
        }
    });

    document.getElementById('searchLinkedList').addEventListener('click', () => {
        const searchValue = document.getElementById('searchLinkedListInput').value.trim();
        if (searchValue) {
            console.log(`Searching for ID: ${searchValue} in LinkedList...`);
            const startTime = performance.now();
            const result = linkedList.findById(searchValue);
            const endTime = performance.now();
            const duration = endTime - startTime;

            if (result) {
                console.log(`Found in LinkedList: ${JSON.stringify(result)}`);
                updateListDisplay('list-business', `Found: ${result.name}, ID: ${result.business}`);
            } else {
                console.log('No record found in LinkedList.');
                updateListDisplay('list-business', 'No record found.');
            }

            const searchTimeElement = document.getElementById('linkedListSearchTime');
            if (searchTimeElement) {
                searchTimeElement.textContent = `${duration.toFixed(2)} ms`;
            } else {
                console.error('Element with ID "linkedListSearchTime" not found.');
            }
        }
    });


//--------------------------------------------------------------------------

document.getElementById('bubbleSortArray').addEventListener('click', () => {
    console.log('Iniciando Bubble Sort en Array...');
    const startTime = performance.now();
    array.bubbleSort();
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(`Bubble Sort en Array completado en ${duration.toFixed(2)} ms`);
    document.getElementById('arrayBubbleSortTime').textContent = `${duration.toFixed(2)} ms`;
    document.getElementById('arrayBubbleSortIterations').textContent = array.bubbleSortIterations;

  
    console.log('Datos en Array después de Bubble Sort:', array.recorrido());
});

document.getElementById('mergeSortArray').addEventListener('click', () => {
    console.log('Iniciando Merge Sort en Array...');
    const startTime = performance.now();
    array.mergeSort();
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(`Merge Sort en Array completado en ${duration.toFixed(2)} ms`);
    document.getElementById('arrayMergeSortTime').textContent = `${duration.toFixed(2)} ms`;
    document.getElementById('arrayMergeSortIterations').textContent = array.mergeSortIterations;

   
    console.log('Datos en Array después de Merge Sort:', array.recorrido());
});



document.getElementById('radixSortArray').addEventListener('click', () => {
    console.log('Iniciando Radix Sort en Array...');
    const startTime = performance.now();
    const arrayData = array.recorrido(); // Obtén los objetos Business
    console.log('Datos en Array antes de Radix Sort:', arrayData.map(b => b.business));
    radixSortStrings(arrayData); // Ordena los objetos Business por business_id
    console.log('Datos después de Radix Sort:', arrayData.map(b => b.business));
    const endTime = performance.now();
    const duration = endTime - startTime;
    document.getElementById('arrayRadixSortTime').textContent = `${duration.toFixed(2)} ms`;
    document.getElementById('arrayRadixSortIterations').textContent = arrayData.length; // No hay iteraciones en radixSort
});


document.getElementById('bubbleSortLinkedList').addEventListener('click', () => {
    console.log('Iniciando Bubble Sort en LinkedList...');
    const startTime = performance.now();
    linkedList.bubbleSort();
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(`Bubble Sort en LinkedList completado en ${duration.toFixed(2)} ms`);
    document.getElementById('linkedListBubbleSortTime').textContent = `${duration.toFixed(2)} ms`;
    document.getElementById('linkedListBubbleSortIterations').textContent = linkedList.bubbleSortIterations;

  
    console.log('Datos en LinkedList después de Bubble Sort:', linkedList.recorrido());
});

document.getElementById('mergeSortLinkedList').addEventListener('click', () => {
    console.log('Iniciando Merge Sort en LinkedList...');
    const startTime = performance.now();
    linkedList.mergeSort();
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(`Merge Sort en LinkedList completado en ${duration.toFixed(2)} ms`);
    document.getElementById('linkedListMergeSortTime').textContent = `${duration.toFixed(2)} ms`;
    document.getElementById('linkedListMergeSortIterations').textContent = linkedList.getMergeSortIterations();
    
     console.log('Datos en LinkedList después de Merge Sort:', linkedList.recorrido());
});

document.getElementById('radixSortLinkedList').addEventListener('click', () => {
    console.log('Iniciando Radix Sort en LinkedList...');
    const result = linkedList.radixSort();
    
    console.log(`Radix Sort en LinkedList completado en ${result.time.toFixed(2)} ms`);
    document.getElementById('linkedListRadixSortTime').textContent = `${result.time.toFixed(2)} ms`;
    document.getElementById('linkedListRadixSortIterations').textContent = `${result.iterations} iteraciones`;

    console.log('Datos en LinkedList después de Radix Sort:', linkedList.recorrido().map(b => b.business));
});


//----------------------------------------------------------------
function getMaxLength(arr) {
    return arr.reduce((max, str) => Math.max(max, str.length), 0);
}

function countingSortByCharacter(arr, index) {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(256).fill(0); // ASCII characters range

    // Count occurrences of each character at position 'index'
    for (let i = 0; i < n; i++) {
        const charCode = arr[i].charCodeAt(index) || 0; // Use 0 for shorter strings
        count[charCode]++;
    }

    // Update count array to hold the position of each character
    for (let i = 1; i < 256; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
        const charCode = arr[i].charCodeAt(index) || 0;
        output[count[charCode] - 1] = arr[i];
        count[charCode]--;
    }

    // Copy the output array to arr[]
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

function radixSortStrings(arr) {
    const maxLen = getMaxLength(arr);

    for (let i = maxLen - 1; i >= 0; i--) {
        countingSortByCharacter(arr, i);
    }
}


function getCharCodeAt(str, index) {
    if (index < str.length) {
        return str.charCodeAt(index);
    }
    return 0; 
}



    
//-------------------------------------------------------------    
});
function updateListDisplay(elementId, data) {
    const listElement = document.getElementById(elementId);
    listElement.textContent = data;
}
