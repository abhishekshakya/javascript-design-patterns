class Command {
  // interface
  execute() {}
  undo() {}
}

class TypeCommand extends Command {
  constructor(editor, text) {
    super();
    this.editor = editor;
    this.text = text;
  }

  execute() {
    this.editor.type(this.text);
  }

  undo() {
    this.editor.delete(this.text.length);
  }
}

class DeleteCommand extends Command {
  constructor(editor, count) {
    super();
    this.editor = editor;
    this.count = count;
    this.deletedText = "";
  }

  execute() {
    this.deletedText = this.editor.delete(this.count);
  }

  undo() {
    this.editor.type(this.deletedText);
  }
}

class CopyCommand extends Command {
  constructor(editor, start, end) {
    super();
    this.editor = editor;
    this.start = start;
    this.end = end;
  }

  execute() {
    this.editor.copy(this.start, this.end);
  }

  undo() {
    // no change in text
  }
}

class PasteCommand extends Command {
  constructor(editor) {
    super();
    this.editor = editor;
    this.pastedText = "";
  }

  execute() {
    this.pastedText = this.editor.clipboard;
    this.editor.paste();
  }

  undo() {
    this.editor.delete(this.pastedText.length);
  }
}

class TextEditor {
  constructor() {
    this.text = "";
    this.clipboard = "";
  }

  type(text) {
    this.text += text;
  }

  delete(count) {
    const len = this.text.length;
    if (count > len) return;
    const deletedText = this.text.substring(len - count, len);
    this.text = this.text.substring(0, len - count);
    return deletedText;
  }

  copy(start, end) {
    this.clipboard = this.text.substring(start, end + 1);
  }

  paste() {
    this.text += this.clipboard;
  }

  getState() {
    console.log(this.text);
    return this.text;
  }
}

//Invoker
class EditorInvoker {
  constructor() {
    this.undoStack = [];
    this.redoStack = [];
  }

  executeCommand(command) {
    this.undoStack.push(command);
    this.redoStack = [];
    command.execute();
  }

  undo() {
    if (this.undoStack.length === 0) return;
    const cmd = this.undoStack.pop();
    cmd.undo();
    this.redoStack.push(cmd);
  }

  redo() {
    if (this.redoStack.length === 0) return;
    const cmd = this.redoStack.pop();
    cmd.execute();
    this.undoStack.push(cmd);
  }
}

const editInvoker = new EditorInvoker();
const editor = new TextEditor(); // just to visualize

const typeCmd = new TypeCommand(editor, "Abhishek");
editInvoker.executeCommand(typeCmd);
editor.getState(); // Abhishek

const delCmd = new DeleteCommand(editor, 2);
editInvoker.executeCommand(delCmd);
editor.getState(); // Abhish

editInvoker.undo();
editor.getState(); // Abhishek

const copyCmd = new CopyCommand(editor, 0, 1);
editInvoker.executeCommand(copyCmd);
editor.getState();

const pasteCmd = new PasteCommand(editor);
editInvoker.executeCommand(pasteCmd);
editor.getState(); // AbhishekAb

editInvoker.undo();
editor.getState(); // Abhishek

editInvoker.redo();
editor.getState(); // AbhishekAb
