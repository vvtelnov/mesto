export default function reverseSortArray(arr) {
  if (!Array.isArray(arr)) {
    arr = Array.from(arr);
  }

  const reverseSortedArr = arr.sort((firstElem, secondElem) => {
    const firstDate = new Date(firstElem.createdAt);
    const secondDate = new Date(secondElem.createdAt);
    return firstDate - secondDate
  }) 
}