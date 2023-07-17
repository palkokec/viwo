import Tree from "./model/Tree";
import * as utils from "./functions/Utils";
import * as reader from "./functions/Reader";

import path from "path";

let searchPath = ".github/workflows";
let filesArr = utils.getFiles(searchPath, new RegExp(/.*[yaml|yml]/));

for (let i = 0; i < filesArr.length; i++) {
  let yamlObj = (reader.readYamlFile(path.join (searchPath, filesArr[i])));
  console.log (yamlObj);
  let tree = new Tree(filesArr[i]);
  tree.objectToTree(yamlObj);
  console.log(tree.toAsciiTree());
}


