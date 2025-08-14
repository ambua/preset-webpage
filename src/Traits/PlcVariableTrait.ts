import { Editor } from "grapesjs";
import { EditorSetupable } from "../Common/EditorSetupable";

export class PlcVariableTrait implements EditorSetupable {
    editor: Editor;



    public readonly traitType = 'plc-variable';
    constructor(editor: Editor) {
        this.editor = editor;
    }

    setup(): void {
        this.editor.Traits.addType(this.traitType, {
            events: { input: 'onEvent', change: 'onEvent' },

            // Render a simple input and wire listeners directly
            createInput({ component, trait }: { component: any; trait: any }) {
              const input = document.createElement('input');
              input.className = 'plc-variable__input';
              input.placeholder = 'Insert a PLC address';
              input.value = trait.getValue?.() || '';

              const pushUpdate = () => {
                const plcVariable = input.value || '';
                const data = { plcVariable };
                component.addAttributes({ adrianVar: JSON.stringify(data) });
                trait.setValue?.(plcVariable);
              };

              input.addEventListener('input', pushUpdate);
              input.addEventListener('change', pushUpdate);

              return input;
            },

            // Update component attribute with JSON on input changes
            onEvent({ elInput, component, trait }: { elInput: HTMLElement; component: any; trait: any }) {
              const inputEl = elInput as HTMLInputElement;
              const plcVariable = inputEl.value || '';
              const data = { plcVariable };
              component.addAttributes({ adrianVar: JSON.stringify(data) });
              trait.setValue?.(plcVariable);
            },

            // Keep the input in sync if the component updates
            onUpdate({ elInput, component }: { elInput: HTMLElement; component: any }) {
              const inputEl = elInput as HTMLInputElement;
              const attrs = component.getAttributes?.() || {};
              const raw = attrs.adrianVar;
              if (typeof raw === 'string') {
                try {
                  const parsed = JSON.parse(raw);
                  if (parsed && typeof parsed.plcVariable === 'string') {
                    inputEl.value = parsed.plcVariable;
                  }
                } catch {}
              }
            },
          });
    }
}
