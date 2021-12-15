export default function (array, portionNum, page) {
  const arrayCopy = [...array];
  const portionArray = [];

  while (arrayCopy.length > 0) portionArray.push(arrayCopy.splice(0, portionNum));

  return portionArray[page - 1];
}