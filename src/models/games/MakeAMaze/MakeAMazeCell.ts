export interface IMakeAMazeCell {
    row: number;
    col: number;
    isEnterable: boolean;
    isPath: boolean;
    isEdge: boolean;
    isCurrentCell: boolean;
    hasOtherPlayer: boolean;
    cssClassName: string;
    isEntryPoint: boolean;
    isExitPoint: boolean;
    isPreviousCell: boolean;
    displayString: string;
    inImageSrc: string;
    outImageSrc: string;
    inTraceImageSrc: string;
    outTraceImageSrc: string;
};

export class MakeAMazeCell implements IMakeAMazeCell {
    row: number = 0;
    col: number = 0;
    isEnterable: boolean = false;
    isPath: boolean = false;
    isEdge: boolean = false;
    isCurrentCell: boolean = false;
    hasOtherPlayer: boolean = false; 
    cssClassName: string = "";
    isPreviousCell: boolean = false;
    isEntryPoint: boolean = false;
    isExitPoint: boolean = false;
    displayString: string = "";
    inImageSrc: string = "/assets/img/path/Empty.svg";
    outImageSrc: string = "/assets/img/path/Empty.svg";
    inTraceImageSrc: string = "/assets/img/path/Empty.svg";
    outTraceImageSrc: string  = "/assets/img/path/Empty.svg";

    constructor(row:number, col:number, isEdge: boolean) {
        this.row = row;
        this.col = col;
        this.cssClassName = isEdge ? "square-enterable" : "square";
        this.isEnterable = isEdge;
        this.isEdge = isEdge;
        this.displayString = row + ", " + col;
    }
}

export class MakeAMazePathCell {
    row: number = 0;
    col: number = 0;
}