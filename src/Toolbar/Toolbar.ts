import { Editor } from "grapesjs";
import { ScreenManager } from "./ScreenManager";
import { EditorSetupable } from "../Common/EditorSetupable";

export class Toolbar implements EditorSetupable {
  editor: Editor;
  private screen: EditorSetupable;

  constructor(editor: Editor) {
    this.editor = editor;
    this.screen = new ScreenManager(editor);
  }

  setup(): void {
    this.screen.setup();
    //this.settings.setup();
  }
}
