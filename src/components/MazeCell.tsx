import { IonCol} from '@ionic/react';
import React, { useState } from 'react';
import './MazeCell.css';

export interface IMazeCellProps {
    row: number;
    col: number;
    cellClickedHandler(row: number, col: number): void;
}

const MazeCell: React.FC<IMazeCellProps> = ({ row, col,cellClickedHandler}) => {
    const [myKey, setMyKey] = useState( row*8+col);
    const [isIn, setIsIn] = useState(false);
    const [isEnterable, setIsEnterable] = useState(row === 0 || row === 7 || col === 0 || col === 7 ? true: false);
    const [isPath, setIsPath] = useState(false);
    const [isEdge, setIsEdge] = useState(row === 0 || row === 7 || col === 0 || col === 7 ? true  : false );
    const [cellBackgroundColor, setCellBackgroundColor] = useState(row === 0 || row === 7 || col === 0 || col === 7 ? "green" : "lightgray");
    const [cssClassName, setCssClassName] = useState(row === 0 || row === 7 || col === 0 || col === 7 ? "square-enterable" : "square");

    // ***** Move these initializers to useState above
    // if (col === 0 || row === 7 || col === 0 || col === 7) {
    //     setIsEdge(true);
    //     setIsEnterable(true);
    //     setCssClassName("square-enterable");
    //     setCellBackgroundColor("green");
    // } else {
    //     setIsEnterable(false);
    // }

    const onClick = () => {
        cellClickedHandler(row, col);
    }

    // public setIsEnterable(isEnterable: boolean): void {
    //     this.isEnterable = isEnterable;
    //     if (this.isEnterable) {
    //         this.myCssClassName = "square-enterable"
    //         this.cellBackgroundColor = "green";       
    //     } else {
    //         this.myCssClassName = "square"
    //         this.cellBackgroundColor = "lightgray";
    //     }
    // }
    return(
        <IonCol className={cssClassName} key={myKey} onClick={isEnterable ? onClick : undefined } >
  
            <p className={cssClassName}>
                {row + "," + col}
            </p>
        </IonCol> 
    )
}

export default MazeCell;

