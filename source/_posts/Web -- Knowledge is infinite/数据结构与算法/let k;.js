const ERROR= 0
function listDelete(L, i, e) {
    let k;
    if (L.length == 0) return Error;
    if (i < 1 || i > L.length) return Error;
    e = L[i - 1];
    if (i < L.length) {
      for (k = i; k < L.length; k++) {
        L[k - 1] = L[k];
      }
    }
    L.length--;
    return L;
  }

const a1 = [1,2,4]

console.log(listDelete(a1,2))