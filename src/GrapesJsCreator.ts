import { Editor } from "grapesjs";
import { EditorSetupable } from "./Common/EditorSetupable";
import { Toolbar } from "./Toolbar/Toolbar";
import { PfsSensor } from "./Components/PfsSensor";
import { PlcVariableTrait } from "./Traits/PlcVariableTrait";

export class GrapesJsCreator {
 editor: Editor;


 private configurables: EditorSetupable[] = [];
 private readonly plcVariableTrait: PlcVariableTrait;

 constructor(editor: Editor) {
    this.editor = editor;
    this.plcVariableTrait = new PlcVariableTrait(editor);
  }

  /**
   * Initializes GrapesJS editor.
   * @returns The initialized GrapesJS editor instance.
   */
  public setupEditor(): Editor {
    this.setupConfigurables();
    return this.editor;
  }

  setupConfigurables() {
    // Order matters: register traits before components that use them
    this.configurables = [
      this.plcVariableTrait,
      new Toolbar(this.editor),
      new PfsSensor(this.editor, this.plcVariableTrait),
    ];
    this.configurables.forEach(config => config.setup());
  }
}