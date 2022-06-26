/** @format */

function convertArrayOfStringsToSentence(stringsArray) {
  let result = "";
  for (let index = 0; index < stringsArray.length; index++) {
    const item = stringsArray[index];
    if (stringsArray.length === 1 || index === stringsArray.length - 1) {
      result += item;
    } else if (index === stringsArray.length - 2) {
      result += `${item} and `;
    } else if (stringsArray.length > 1 && index !== stringsArray.length - 1) {
      result += `${item}, `;
    }
  }
  return result;
}
function convertArrayOfStringsToShortenedSentence(stringsArray) {
  let result = "---";
  //if there is 1 item return "a"
  //if there are 2 of them return "a and b"
  //if there are more 2 of them return "a and {total length -1} others"
  if (stringsArray && stringsArray.length && stringsArray.length === 1) {
    result = stringsArray[0];
  }
  if (stringsArray && stringsArray.length && stringsArray.length === 2) {
    result = `${stringsArray[0]} and ${stringsArray[1]}`;
  }
  if (stringsArray && stringsArray.length && stringsArray.length > 2) {
    result = `${stringsArray[0]} and ${stringsArray.length - 1} others`;
  }
  return result;
}
module.exports = {
  convertArrayOfStringsToSentence,
  convertArrayOfStringsToShortenedSentence,
};
