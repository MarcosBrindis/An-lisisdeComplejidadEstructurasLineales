import { Business } from '../models/Business.mjs';
export class Array {
    constructor() {
        this.array = [];
    }

    push(item) {
        this.array.push(item);
    }

    recorrido() {
        return this.array;
    }

    size() {
        return this.array.length;
    }

    isEmpty() {
        return this.array.length === 0;
    }

    getHead() {
        return this.array.length > 0 ? this.array[0] : null;
    }

    find(item) {
        return this.array.includes(item);
    }

    findById(id) {
        return this.array.find(item => item.business === id);
    }



    bubbleSort() {
        let n = this.array.length;
        this.bubbleSortIterations = 0; 
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                this.bubbleSortIterations++; 
                if (this.array[j].business > this.array[j + 1].business) {
                    [this.array[j], this.array[j + 1]] = [this.array[j + 1], this.array[j]];
                }
            }
        }
    }

    mergeSort() {
        this.mergeSortIterations = 0; // Reinicia el contador de iteraciones

        const merge = (left, right) => {
            this.mergeSortIterations++; 
            let result = [], leftIndex = 0, rightIndex = 0;
            while (leftIndex < left.length && rightIndex < right.length) {
                if (left[leftIndex].business < right[rightIndex].business) {
                    result.push(left[leftIndex]);
                    leftIndex++;
                } else {
                    result.push(right[rightIndex]);
                    rightIndex++;
                }
            }
            return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
        };

        const sort = (arr) => {
            this.mergeSortIterations++; 
            if (arr.length < 2) {
                return arr;
            }
            const middle = Math.floor(arr.length / 2);
            const left = arr.slice(0, middle);
            const right = arr.slice(middle);
            return merge(sort(left), sort(right));
        };

        this.array = sort(this.array);
    }
    
   
    /*radixSort(arrayData) {
        const maxLength = Math.max(...arrayData.map(item => item.business.length));
        let iterationCount = 0; // Contador de iteraciones
    
        // Función auxiliar para obtener el carácter en una posición específica
        const getCharAt = (str, index) => {
            return index < str.length ? str.charAt(str.length - index - 1) : '0';
        };
    
        // Radix sort
        for (let pos = 0; pos < maxLength; pos++) {
            iterationCount++; // Incrementa el contador de iteraciones
            let buckets = Array.from({ length: 36 }, () => []); // Inicializa 36 buckets como arrays vacíos
    
            // Distribuye los elementos en los buckets
            for (let item of arrayData) {
                let char = getCharAt(item.business, pos);
                let bucketIndex = parseInt(char, 36); // Convierte el carácter a un índice
                buckets[bucketIndex].push(item);
            }
    
            // Recolecta los elementos de los buckets
            arrayData = [];
            for (let bucket of buckets) {
                arrayData = arrayData.concat(bucket);
            }
        }
    
        // Actualiza el array con los datos ordenados
        console.log('Datos después de Radix Sort:', arrayData.map(item => item.business));
        return iterationCount; // Devuelve el número de iteraciones realizadas
    }*/
    
}
