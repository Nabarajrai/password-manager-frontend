// export const setLocalStorage = (key, value) => {
//   try {
//     localStorage.setItem(key, JSON.stringify(value));
//   } catch (e) {
//     console.error("Error stringifying value:", value, e);
//   }
// };

// export const getLocalStorage = (key) => {
//   const item = localStorage.getItem(key);
//   if (item === null) {
//     return null; // Or return undefined;
//   }
//   try {
//     return JSON.parse(item);
//   } catch (error) {
//     console.error("Error parsing local storage", item, error);
//     return null;
//   }
// };

// export const clearLocalStorage = () => {
//   localStorage.clear();
// };
