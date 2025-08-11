import { Editor } from "grapesjs";
import { EditorSetupable } from "../Common/EditorSetupable";

export class PfsSensor implements EditorSetupable {

    

    editor: Editor;
    private readonly BlockCategory = 'PFS';

    constructor(editor: Editor) {
        this.editor = editor;
    }


    /**
    * Sets up the device manager with custom device profiles.
    */
    setup(): void {
        this.addBlock();
    }

    private addBlock(): void {
        this.editor.Blocks.add('pfs-sensor', {
            label: 'PFS Sensor',
            category: this.BlockCategory,
            attributes: {
                class: 'fa fa-square',
                title: 'PFS Sensor',
            },
            content: `<section class="bdg-sect">
        <div data-pfs-config='{"plcVariable": "tempSensor", "unit": "C"}'>Sensor</div>
      </section>`,
        });
    }
}