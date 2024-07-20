import { Node } from "./Node.mjs";

export class LinkedList {
    #count;
    #head;
    #mergeSortIterations;

    constructor() {
        this.#count = 0;
        this.#head = null;
        this.#mergeSortIterations = 0;
    }

    recorrido() {
        const elements = [];
        for (let current = this.#head; current !== null; current = current.next) {
            elements.push(current.value);
        }
        return elements;
    }

    findById(id) {
        let current = this.#head;
        while (current) {
            if (current.value.business === id) {
                return current.value;
            }
            current = current.next;
        }
        return null;
    }

    push(item) {
        const node = new Node(item);
        let current;
        if (this.#head == null) {
            this.#head = node;
        } else {
            current = this.#head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;
        }
        this.#count++;
    }

    size() {
        return this.#count;
    }

    isEmpty() {
        return this.#count === 0;
    }

    getHead() {
        return this.#head;
    }

    clear() {
        this.#count = 0;
        this.#head = null;
    }

    bubbleSort() {
        if (!this.#head) return;

        this.bubbleSortIterations = 0; // Inicializa el contador de iteraciones

        let swapped;
        do {
            swapped = false;
            let current = this.#head;
            while (current && current.next) {
                this.bubbleSortIterations++; // Incrementa el contador en cada comparación
                if (current.value.business > current.next.value.business) {
                    let temp = current.value;
                    current.value = current.next.value;
                    current.next.value = temp;
                    swapped = true;
                }
                current = current.next;
            }
        } while (swapped);
    }

 





    mergeSort() {
        this.#mergeSortIterations = 0; // Reinicia el contador de iteraciones
        this.#head = this.mergeSortRecursive(this.#head);
    }

    mergeSortRecursive(head) {
        this.#mergeSortIterations++; // Incrementa el contador de iteraciones
        if (!head || !head.next) return head;

        const middle = this.getMiddle(head);
        const left = head;
        const right = middle.next;
        middle.next = null;

        const leftList = this.mergeSortRecursive(left);
        const rightList = this.mergeSortRecursive(right);

        return this.merge(leftList, rightList);
    }

    getMiddle(head) {
        if (!head) return head;
        let slow = head, fast = head;
        while (fast.next && fast.next.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    merge(left, right) {
        let dummy = new Node();
        let tail = dummy;

        while (left && right) {
            if (left.value.business <= right.value.business) {
                tail.next = left;
                left = left.next;
            } else {
                tail.next = right;
                right = right.next;
            }
            tail = tail.next;
        }

        tail.next = left || right;
        return dummy.next;
    }

    getMergeSortIterations() {
        return this.#mergeSortIterations; // Retorna el número de iteraciones
    }







  convertToNumeric(str) {
    if (!str) {
        console.error('Valor no válido para conversión:', str);
        return 0;
    }
    
    let numericValue = 0;
    const base = 36; // Usamos base 36 para incluir dígitos y letras
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i) - '0'.charCodeAt(0); // Convertir caracteres a valores numéricos
        numericValue = numericValue * base + charCode;
    }
    console.log(`Convertido "${str}" a numérico: ${numericValue}`);
    return numericValue;
}


countingSort(head, exp) {
    const output = [];
    const count = new Array(10).fill(0); 
    let current = head;
    let iterations = 0;

    while (current) {
        iterations++;
        const numericValue = this.convertToNumeric(current.data.business);
        const index = Math.floor(numericValue / exp) % 10;
        count[index]++; 
        current = current.next; 
    }
    
    for (let i = 1; i < 10; i++) {
        iterations++;
        count[i] += count[i - 1]; 
    }

    current = head;
    while (current) {
        iterations++;
        const numericValue = this.convertToNumeric(current.data.business);
        const index = Math.floor(numericValue / exp) % 10;
        output[count[index] - 1] = current; 
        count[index]--; 
        current = current.next; 
    }

    let index = 0;
    current = head;
    while (current) {
        iterations++;
        current.data = output[index].data; 
        index++;
        current = current.next; 
    }

    console.log(`Counting Sort completado con ${iterations} iteraciones para exp=${exp}`);

    return iterations; 
}

    
    radixSort() {
        const startTime = performance.now(); 
    
        let current = this.head;
        let max = 20000;
        while (current) {
            const numericValue = this.convertToNumeric(current.data.business);
            if (numericValue > max) {
                max = numericValue;
            }
            current = current.next;
        }
    
        if (max === 0) {
            console.error('El valor máximo encontrado es 0, verifica la conversión a numérico.');
            return { sortedList: this.head, time: 0, iterations: 0 };
        }
    
        console.log(`Valor máximo encontrado: ${max}`);
    
        let totalIterations = 0; 
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            totalIterations += this.countingSort(this.head, exp); 
        }
    
        const endTime = performance.now(); 
    
        console.log(`Radix Sort completado con ${totalIterations} iteraciones`);
    
        return { sortedList: this.head, time: endTime - startTime, iterations: totalIterations }; 
    }
    
}
