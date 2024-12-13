export const easyAPIcall = async () => {return fetch('https://random-word-api.herokuapp.com/word?length=4')};
export const normalAPIcall = async () => await fetch('https://random-word-api.herokuapp.com/word?length=6');
export const hardAPIcall = async () => await fetch('https://random-word-api.herokuapp.com/word?length=8');
