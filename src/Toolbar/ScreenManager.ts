import { Editor } from "grapesjs";
import { EditorSetupable } from "../Common/EditorSetupable";
import {
    cmdImport,
    cmdDeviceDesktop,
    cmdDeviceTablet,
    cmdDeviceMobile,
    cmdClear
} from '../consts';

interface PanelButton {
    id: string;
    command: string | (() => void);
    active?: boolean;
    label: string;
    className?: string;
    attributes?: Record<string, any>;
}

interface PanelConfig {
    id: string;
    buttons?: PanelButton[];
    appendTo?: string | HTMLElement;
    visible?: boolean;
    className?: string;
    attributes?: Record<string, any>;
}

export class ScreenManager implements EditorSetupable {

    

    editor: Editor;
    constructor(editor: Editor) {
        this.editor = editor;
    }


    /**
    * Sets up the device manager with custom device profiles.
    */
    setup(): void {
        this.removeDefaultDevices();
        this.addCustomDevices();
    }

    /**
     * Removes default devices from the device manager.
     */
    private removeDefaultDevices(): void {
        const defaultDevices = [
            "mobileLandscape",
            "mobilePortrait",
            "tablet"
        ];
        defaultDevices.forEach(deviceId => this.editor.Devices.remove(deviceId));
    }

    /**
     * Adds custom devices to the device manager and sets up device switching UI.
     */
    private addCustomDevices(): void {
        const deviceManager = this.editor.Devices;
        const { Panels } = this.editor;
        const iconStyle = 'style="display: block; max-width:22px"';
        
        // Add custom devices with proper configuration
        deviceManager.add({
            id: 'desktop',
            name: 'Desktop',
            width: '1024px'
        });
        deviceManager.add({
            id: 'tablet',
            name: 'Tablet',
            width: '768px'
        });
        deviceManager.add({
            id: 'mobile',
            name: 'Mobile',
            width: '320px'
        });

        // Define device buttons
        const deviceButtons: PanelButton[] = [
            {
                id: cmdDeviceDesktop,
                command: cmdDeviceDesktop,
                active: true,
                label: `<svg ${iconStyle} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M21,16H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16A2,2 0 0,0 3,18H10V20H8V22H16V20H14V18H21A2,2 0 0,0 23,16V4C23,2.89 22.1,2 21,2Z" />
                </svg>`
            },
            {
                id: cmdDeviceTablet,
                command: cmdDeviceTablet,
                label: `<svg ${iconStyle} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,18H5V6H19M21,4H3C1.89,4 1,4.89 1,6V18A2,2 0 0,0 3,20H21A2,2 0 0,0 23,18V6C23,4.89 22.1,4 21,4Z" />
                </svg>`
            },
            {
                id: cmdDeviceMobile,
                command: cmdDeviceMobile,
                label: `<svg ${iconStyle} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z" />
                </svg>`
            }
        ];

        // Add devices panel with buttons
        Panels.addPanel({
            id: 'devices-c',
            buttons: deviceButtons,
            attributes: { class: 'panel__devices' }
        } as any);
    }
}