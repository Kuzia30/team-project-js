export default class LocalStorService {
  
  // Получить массив объектов из списка Watched
 getFromWatchedLS() {
    try {
      const movieArr = JSON.parse(localStorage.getItem('Watched'));
      return movieArr === null ? undefined : movieArr;
    } catch (err) {
      console.error('Get state error: ', err);
    }
  }

  // Получить массив объектов из списка Queue
 getQueueLS() {
    try {
      const movieArr = JSON.parse(localStorage.getItem('Queue'));
      return movieArr === null ? undefined : movieArr;
    } catch (err) {
      console.error('Get state error: ', err);
    }
  }
}

 // Принимает ключ `key` по которому будет произведена выборка.
const load = key => {
  try {
    let serializedState = localStorage.getItem(key);

    return (serializedState = JSON.parse(serializedState) || undefined);
  } catch (err) {
    console.error('Get state error: ', err);
  }
};

// Принимает ключ `key` и значение `value`.
const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error('Set state error: ', err);
  }
};

// Принимает ключ `key`
const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Remove state error: ', err);
  }
};

export { load, save, remove };
