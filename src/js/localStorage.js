
// Принимает ключ `key` по которому выбираем обьект.
const load = key => {
  try {
    let serialState = localStorage.getItem(key);

    return (serialState = JSON.parse(serialState) || undefined);
  } catch (err) {
    console.error('Get state error: ', err);
  }
};

// Сохраняем ключ `key` и значение `value`.
const save = (key, value) => {
  try {
    const serialState = JSON.stringify(value);
    localStorage.setItem(key, serialState);
  } catch (err) {
    console.error('Set state error: ', err);
  }
};

// Удаляем ключ `key`
const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Remove state error: ', err);
  }
};

export { load, save, remove };