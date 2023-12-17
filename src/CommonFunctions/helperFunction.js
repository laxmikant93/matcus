export const convertToIndianFormat = (val) => {
  let resp = '';
  let prev = 0;
  let curr = 3;
  let out = [];
  if (val || val == 0) {
    resp = val.toString().split('').reverse();
    if (resp.length >= 3) {
      while (curr <= resp.length + 1) {
        const str = resp.slice(prev, curr);
        out = [...out, ...str, ','];
        prev = curr;
        curr = curr + 2;
      }
      out = out.reverse()
      out = out.join("").substring(1);
      return out;
    }
  }
  return val;
}