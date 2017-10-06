'use babel';

import PrintmeView from './printme-view';
import { CompositeDisposable } from 'atom';

export default {

  printmeView: null,
  modalPanel: null,
  subscriptions: null,
  config: {
  "textContent": {
    "description": "Define what will be added when running this script. Include {{varname}} where you want it to be print",
    "type": "string",
    "default": "fmt.Println(\">>>>>>>>>>>  {{varname}} :\")\nfmt.Println({{varname}})"
  }
},

  activate(state) {
    this.printmeView = new PrintmeView(state.printmeViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.printmeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'printme:toggle': () => this.toggle()
    }))
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.printmeView.destroy();
  },

  serialize() {
    return {
      printmeViewState: this.printmeView.serialize()
    };
  },

  toggle() {
    console.log('Printme was toggled!');
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let newtext = atom.config.get("printme.textContent")
      newtext=newtext.replace(/{{varname}}/g,selection)
      textarray = newtext.split("\n")
      for (var i in textarray) {
        editor.insertNewlineBelow()
        editor.insertText(textarray[i])
      }
    }
    // return (
      // this.modalPanel.isVisible() ?
      // this.modalPanel.hide() :
      // this.modalPanel.show()
    // );
  }

};
