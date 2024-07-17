const capitalize = (stringToWork) => {
  return stringToWork[0].toUpperCase() + stringToWork.slice(1);
};

const reverseString = (stringToWork) => {
  let left = 0;
  let right = stringToWork.length - 1;
  let ans = [];
  while (left <= right) {
    ans[right] = stringToWork.charAt(left);
    ans[left] = stringToWork.charAt(right);
    left++;
    right--;
  }
  return ans.join("");
};

module.exports = { capitalize, reverseString };
