import { Piece, PieceType, TeamType } from "../types";

export function isTileOccupied(
  x: number,
  y: number,
  boardState: Piece[]
): boolean {
  const piece = boardState.find((p) => p.x === x && p.y === y);
  console.log(piece);
  if (piece) {
    return true;
  } else {
    return false;
  }
}

export function isValidMove(
  px: number,
  py: number,
  x: number,
  y: number,
  type: PieceType,
  team: TeamType,
  boardState: Piece[]
) {
  if (type === PieceType.PAWN) {
    const specialRow = (team === TeamType.OUR) ? 1 : 6;
    const pawnDirection = (team === TeamType.OUR) ? 1 : -1

    if(py === specialRow){
        if(px === x && y - py === 1*pawnDirection){
            if (!isTileOccupied(x, y, boardState)) {
                return true;
            }
        }else if(px === x && y - py === 2*pawnDirection){
            if (
                !isTileOccupied(x, y, boardState) &&
                !isTileOccupied(x, y - pawnDirection, boardState)
              ) {
                return true;
              }
        }else{
            if(px === x && y - py === pawnDirection){
                if (!isTileOccupied(x, y, boardState)) {
                    return true;
                }
            }
        }
    }


    // if (team === TeamType.OUR) {
    //   if (py === 1) {
    //     if (px === x && y - py === 1) {
    //       if (!isTileOccupied(x, y, boardState)) {
    //         return true;
    //       }
    //     } else if (px === x && y - py === 2) {
    //       if (
    //         !isTileOccupied(x, y, boardState) &&
    //         !isTileOccupied(x, y - 1, boardState)
    //       ) {
    //         return true;
    //       }
    //     }
    //   } else {
    //     if (px === x && y - py === 1) {
    //       if (!isTileOccupied(x, y, boardState)) {
    //         return true;
    //       }
    //     }
    //   }
    // } else {
    //   if (py === 6) {
    //     if (px === x && y - py === -1) {
    //       if (!isTileOccupied(x, y, boardState)) {
    //         return true;
    //       }
    //     }
    //   } else if (px === x && y - py === -2) {
    //     if (
    //       !isTileOccupied(x, y, boardState) &&
    //       !isTileOccupied(x, y + 1, boardState)
    //     ) {
    //       return true;
    //     }
    //   } else {
    //     if (px === x && y - py === -1) {
    //       if (!isTileOccupied(x, y, boardState)) {
    //         return true;
    //       }
    //     }
    //   }
    // }
    return false;
  }
}
