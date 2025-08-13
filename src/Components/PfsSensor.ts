import { Editor } from "grapesjs";
import { EditorSetupable } from "../Common/EditorSetupable";
import { PlcVariableTrait } from "../Traits/PlcVariableTrait";

export class PfsSensor implements EditorSetupable {



    editor: Editor;
    private readonly plcVariableTrait: PlcVariableTrait;

    private readonly BlockCategory = 'PFS';

    private readonly blockIconHtml = `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20Z" />
    </svg>`;

    private readonly componentType = 'pfs-sensor';

    constructor(editor: Editor, plcVariableTrait: PlcVariableTrait) {
        this.editor = editor;
        this.plcVariableTrait = plcVariableTrait
    }


    /**
    * Sets up the device manager with custom device profiles.
    */
    setup(): void {
        this.addBlock();
        this.addTraits();
    }

    private addBlock(): void {
        this.editor.Blocks.add(this.componentType, {
            label: 'PFS Sensor',
            category: this.BlockCategory,
            media: this.blockIconHtml,
            content: `<section class="bdg-sect">
        <div data-pfs-config='{"plcVariable": "tempSensor", "unit": "C"}'>Sensor</div>
      </section>`,
        });
    }

    private addTraits(): void {
        this.editor.Components.addType(this.componentType, {
            isComponent: (el) => {
                if (el instanceof HTMLElement) {
                    return el.getAttribute('data-pfs-config') !== null;
                }
                return false;
            },
              model: {
                defaults: {
                  traits: [
                    {
                      type: this.plcVariableTrait.traitType,
                      name: this.plcVariableTrait.traitType,
                      label: 'Address',
                    },
                  ],
                },
              },
          });
    }
}