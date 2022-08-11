/**
 * @description A generator function which returns an element of the given inputList at random without repeating the same element 'excludePrevious' times.
 * @param {any[]} inputList Input list from which elements are chosen at random.
 * @param {NUmber} excludePrevious value of n where thw random choices don't repeat the previous n values.
 * @example
 * const generator = randomiseList([1,2,3,..., 20], 2);
 * //next() can be called any number of times, irrespective of list length.
 * generator.next(); // returns element at random.
 */
 export function* randomiseList(inputList: any[], excludePrevious = 1) {
    const range = getNumberLength(inputList.length);
    while (true) {
        const choiceIndex = getRandomInteger(10 ** range) % (inputList.length - excludePrevious);

        yield (inputList[choiceIndex]);

        const choice = inputList.splice(choiceIndex, 1);
        inputList = inputList.concat(choice);
    }
}

/**
 * @description generate a random integer within the given digit range.
 * @param {Number} digitRange Range in terms of 10^n where n is the number of the digits
 */
export const getRandomInteger = (digitRange = 10) => Math.floor(Math.random() * digitRange);

/**
 * @description Get the number of digits for the given input
 * @param {Number} inputNumber 
 */
const getNumberLength = (inputNumber) => Math.floor(inputNumber / 10) === 0 ? 1 : (1 + getNumberLength(inputNumber / 10));

