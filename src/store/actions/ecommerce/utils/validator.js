export const validator = (type, value) => {
  let re;
  switch (type) {
    case 'email':
      re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(value.trim());

    case 'password':
      return (value.trim().length >= 5);

    case 'name':
      return value.trim().includes(' ');
    case 'tleft':
      return value.trimLeft();
    case 'contact':
      re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      return re.test(value);

    default:
      return value.trim();
  }
}