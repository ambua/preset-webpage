import { Editor } from "grapesjs";
import { EditorSetupable } from "../Common/EditorSetupable";

export class PfsSensor implements EditorSetupable {



    editor: Editor;
    private readonly BlockCategory = 'PFS';

    private readonly blockIconHtml = `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20Z" />
    </svg>`;

    constructor(editor: Editor) {
        this.editor = editor;
    }


    /**
    * Sets up the device manager with custom device profiles.
    */
    setup(): void {
        this.addBlock();
        this.addTraits();
    }

    private addBlock(): void {
        this.editor.Blocks.add('pfs-sensor', {
            label: 'PFS Sensor',
            category: this.BlockCategory,
            media: this.blockIconHtml,
            content: `<section class="bdg-sect">
        <div data-pfs-config='{"plcVariable": "tempSensor", "unit": "C"}'>Sensor</div>
      </section>`,
        });
    }

    private addTraits(): void {
        // this.editor.Components.addType('input', {
        //     isComponent: (el) => el.tagName === 'INPUT',
        //     model: {
        //       defaults: {
        //         traits: [
        //           // Strings are automatically converted to text types
        //           'name', // Same as: { type: 'text', name: 'name' }
        //           'placeholder',
        //           {
        //             type: 'select', // Type of the trait
        //             name: 'type', // (required) The name of the attribute/property to use on component
        //             label: 'Type', // The label you will see in Settings
        //             options: [
        //               { id: 'text', label: 'Text' },
        //               { id: 'email', label: 'Email' },
        //               { id: 'password', label: 'Password' },
        //               { id: 'number', label: 'Number' },
        //             ],
        //           },
        //           {
        //             type: 'checkbox',
        //             name: 'required',
        //           },
        //         ],
        //         // As by default, traits are bound to attributes, so to define
        //         // their initial value we can use attributes
        //         attributes: { type: 'text', required: true },
        //       },
        //     },
        //   });
    }
}