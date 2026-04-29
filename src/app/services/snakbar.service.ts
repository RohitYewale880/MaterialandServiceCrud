
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn:'root'
})
export class snakbarservice{
    constructor(private _mathSnakbar: MatSnackBar){

    }

    OpenSnakbar(msg:string){
        this._mathSnakbar.open(msg, 'close', {
            duration:3000,
            horizontalPosition:'left',
            verticalPosition:'top'
        })
    }

}