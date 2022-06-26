export function hideEmail(email: string) {
    const numberOfTextsShowing = 2; // i.e showing us**@email.com from user@emaill.com
    const name = email.split("@")[0]; 
    const emailDomain = email.split("@")[1];
    let shownText = name.slice(numberOfTextsShowing);
    let asteriks = "";
    for (let index = 0; index < shownText.length; index++) {
      asteriks = asteriks + "*";
    }
    let hidden = name.slice(0, numberOfTextsShowing) + `${asteriks}@${emailDomain}`;
  
    return hidden;
  }