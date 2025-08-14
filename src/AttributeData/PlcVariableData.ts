export class PlcVariableData {
    public static readonly attributeName = 'data-pfs-plc-variable' as const;

    public name: string;
    public address: number;

    constructor(params: { name: string; address: number }) {
        this.name = params.name;
        this.address = params.address;
    }
}