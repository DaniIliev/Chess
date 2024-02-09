import { PieceType, TeamType } from "../types";


export function isValidMove(px:number, py: number, x: number, y:number, type: PieceType, team: TeamType){

    if(type === PieceType.PAWN){
        if(team === TeamType.OUR){
            if(py === 1){
                if(px === x && (y-py === 1 || y - py === 2)){
                    return true
                }
            }else{
                if(px === x && y - py === 1){
                    return true
                }
            }
        }else{
            if(py === 6){
                if(px === x && (y-py === -1 || y-py === -2)){
                    return true
                }
            }else{
                if(px === x && y - py === -1){
                    return true
                }
            }
        }
    }


    return false
}