export const checkSound = () => {
 let hasSound = localStorage.getItem('sound') || true;
 return hasSound === 'false' ? false : true
}