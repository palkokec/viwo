import * as fs from "fs";

/* get all files in folder by regex */
export function getFiles(dir: string, regex: RegExp): string[] {
  return fs.readdirSync(dir).filter((file) => regex.test(file));
}

// hashString function
export function hashString(str: string, salt: number): string {
    //TODO: remove bit of randomness by applying salt to str hash
    
    let d = new Date().getTime();//Timestamp
    let hashReturn = 'xxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function(c) {
        let r = Math.random() * 16;//random number between 0 and 16
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

  return hashReturn;
}
