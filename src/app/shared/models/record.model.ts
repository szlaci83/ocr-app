export class Record {
  filetype: string;
  content: string;
  lang: string|any;
}

export class Document {
  text: string;
  _id: string;
}

class Mapping {
  key: string;
  value: string;
}
