import { Editor } from "grapesjs";

export interface EditorSetupable {
    editor: Editor;


    /**
     * Setup logic for the configurable editor module.
     */
    setup(): void;
}