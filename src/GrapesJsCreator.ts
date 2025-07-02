import { Editor } from "grapesjs";
import { EditorSetupable } from "./Common/EditorSetupable";
import { Toolbar } from "./Toolbar/Toolbar";

export class GrapesJsCreator {
 editor: Editor;
 constructor(editor: Editor) {
    this.editor = editor;
  }

  private configurables: EditorSetupable[] = [];

  /**
   * Initializes GrapesJS editor.
   * @returns The initialized GrapesJS editor instance.
   */
  public setupEditor(): Editor {
      this.setupConfigurables();
      return this.editor;
  }
    setupConfigurables() {
        this.configurables = [
            new Toolbar(this.editor)
        ];
        this.configurables.forEach(config => config.setup());
    }
}