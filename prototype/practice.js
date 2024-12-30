class Document {
  constructor() {
    this.title = "";
    this.content = "";
    this.styles = {};
  }
}

class ResumeTemplate extends Document {
  constructor(
    title = "Deedy Resume",
    content = "A sample content for resume",
    styles = {
      fontStyle: "bold",
      colorScheme: "formal",
    }
  ) {
    super();
    this.title = title;
    this.content = content;
    this.styles = styles;
  }

  clone() {
    return new ResumeTemplate(this.title, this.content, this.styles);
  }
}

class ReportTemplate extends Document {
  constructor(
    title = "A Fun Event",
    content = "A sample content for event happened at green park",
    styles = {
      fontStyle: "normal",
      colorScheme: "fun",
    }
  ) {
    super();
    this.title = title;
    this.content = content;
    this.styles = styles;
  }

  clone() {
    return new ReportTemplate(this.title, this.content, this, this.styles);
  }
}

const resume1 = new ResumeTemplate();
resume1.title = "Abhishek's Resume";
resume1.content = "Software engineer";

console.log(resume1);

const resume2 = resume1.clone();
resume2.title = "Abhisheks's New Resume";
console.log(resume2);
