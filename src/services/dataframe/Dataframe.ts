import Thesaurus from "../thesaurus/Thesaurus";

class Dataframe {

    columns: string[];
    data: any[][];

    constructor (columns: string[] = [], data: any[][] = []) {
        this.columns = columns;
        this.data = data;
    }

    head (n: number = 5): Dataframe {
        const data = this.data.slice(0, n);

        return new Dataframe (this.columns, data);
    }

    tail (n: number = 5): Dataframe {
        const data = this.data.slice(-n);

        return new Dataframe (this.columns, data);
    }

    sample (n: number = 5): Dataframe {
        //not implemented yet

        return this.head(10);
    }

    addColumn (column: string, values: any[], index: number = -1): void {
        this.columns.splice(index, 0, column);

        values.map((value: any, i: number) => {
            if (!this.data[i]) {
                this.data[i] = [value];
            } else {
                this.data[i].splice(index, 0, value || "");
            }
        });
    }

    dropColumn (column: string): void {
        const index = this.columns.indexOf(column);

        if (index >= 0) {
            this.columns.splice(index, 1);
            this.data.map((row: any[]) => { row.splice(index, 1) });
        }
    }

    setColumns (columns: string[]): void {
        this.columns = columns;
    }

    addRow (row: any[], index: number = -1): void {
        if (row.length !== 0) {
            this.data.splice(index, 0, row);
        }
    }

    dropRow (index: number): void {
        if (index <= this.data.length -1) {
            this.data.splice(index, 1);
        }
    }

    setRows (rows: any[][]): void {
        this.data = rows;
    }

    replace (target: string[], value: string): void {
        this.data = this.data.map((row: any[]) => row.map((term) => target.includes(term) ? value : term ));
    }

    notNull (): void {
        this.data = this.data.map((row: any[]) => row.map((term) => {
            if (!term || term === "null") {
                return "";
            }

            return term;
        }))
    }

    applyReplace (expression: string, subtitute: string = ""): void {
        this.data = this.data.map((row) => row.map((item) => `${item}`.replace(expression, subtitute)));
    }

    applyFilter (filter: any): void {
        this.data = this.data.map(filter);
    }

    fromJSON (entries: any[]): void {
        if (entries.length !== 0) {
            this.columns = Object.keys(entries[0]);

            entries.shift();

            entries.forEach((entry: any) => {
                let row: any[] = [];

                this.columns.forEach((column) => {
                    row.push(entry[column]);
                })

                this.addRow(row);
            })
        }
    }

    exportJSON (): any[] {
        const entries: any[] = this.data.map((row) => {
            let entry: any = {}
            row.map((item, index) => {
                if (index < this.columns.length) {
                    entry[`${this.columns[index]}`] = item;
                }
            })
            return entry;
        })
        
        return entries;
    }

    async applyThesaurus (thesaurus: Thesaurus): Promise<void> {
        return new Promise((resolve) => {
            thesaurus.data.graph.forEachNode(node => {
                this.data = this.data.map((row) => row.map((item) => thesaurus.data.graph.neighbors(node).includes(`${item}`) ? node : `${item}`));
            })
            resolve();
        })
    }
}

export default Dataframe;