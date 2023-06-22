

/* function readYamlFile */
import yaml from 'yaml';
import * as fs from 'fs';

export function readFileToString(path: string): string {
  return fs.readFileSync(path, 'utf8');
}

export function readYamlFile(path: string): any {
  return yaml.parse(readFileToString(path));
}

export function readJenkinsfile(path: string): any {
  return yaml.parse(readFileToString(path));
}