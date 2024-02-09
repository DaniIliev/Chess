import { useRef, useState } from 'react';
import Tile from '../tile/Tile';
import './Chessboard.css'
import { Piece, PieceType, TeamType } from '../../types';

const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalAxis = ['1','2','3','4','5','6','7','8']


const initialBoardState:Piece[] = []


export default function Chessboard(){
    const [gridX, setGridX] = useState(0)
    const [gridY, setGridY] = useState(0)

    const [pieces, setPieces] = useState(initialBoardState)
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null)
    const chessboardRef = useRef<HTMLDivElement>(null)

    let board = [];

    function grabPiece(e: React.MouseEvent){

    const element = e.target as HTMLElement

    const chessboard = chessboardRef.current
    if(element.classList.contains('chess-piece') && chessboard){

        setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100)) 
        setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)));

        const x = e.clientX-30;
        const y = e.clientY-30;

        element.style.position = 'absolute'
        element.style.left = `${x}px`
        element.style.top = `${y}px`

        setActivePiece(element);
    }
    }

    function movePiece(e: React.MouseEvent){

    const chessboard = chessboardRef.current

    if(activePiece && chessboard){
        const minX = chessboard.offsetLeft;
        const minY = chessboard.offsetTop;

        const maxX = chessboard.offsetLeft + chessboard.clientWidth-50;
        const maxY = chessboard.offsetTop + chessboard.clientHeight-50;

        const x = e.clientX;
        const y = e.clientY;

        activePiece.style.position = "absolute"

        if(x < minX){
            activePiece.style.left = `${minX}px`
        }else if(x > maxX){
            activePiece.style.left = `${maxX}px`
        }else{
            activePiece.style.left = `${x}px`

        }

        if(y < minY){
            activePiece.style.top = `${minY}px`
        }else if(y > maxY){
            activePiece.style.top = `${maxY}px`
        }else{
            activePiece.style.top = `${y}px`
        }
    }
    }

    function dropPiece(e: React.MouseEvent){
        const chessboard = chessboardRef.current

        if(activePiece && chessboard){
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100)
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100));

            setPieces((value) => {
                const pieses = value.map((p) => {
                    if(p.x == gridX && p.y === gridY){
                        p.x = x;
                        p.y = y
                    }
                    return p
                })
                return pieses
            })
            setActivePiece(null)
        }
    }

    for(let p = 0; p < 2; p++){
        const teamType = (p===0) ? TeamType.OPPONENT : TeamType.OUR
        const type = teamType === TeamType.OPPONENT ? 'solid' : 'regular'
        const y = teamType === TeamType.OPPONENT ? 7 : 0

    initialBoardState.push({image: `icons/chess-rook-${type}.svg`, x: 0, y:y, type: PieceType.ROCK, team: teamType})
    initialBoardState.push({image: `icons/chess-knight-${type}.svg`, x: 1, y:y, type: PieceType.KNIGHT, team: teamType})
    initialBoardState.push({image: `icons/chess-bishop-${type}.svg`, x: 2, y:y, type: PieceType.BITSHOP, team: teamType})
    initialBoardState.push({image: `icons/chess-queen-${type}.svg`, x: 3, y:y, type: PieceType.QUEEN , team: teamType})
    initialBoardState.push({image: `icons/chess-king-${type}.svg`, x: 4, y:y, type: PieceType.KING , team: teamType})
    initialBoardState.push({image: `icons/chess-bishop-${type}.svg`, x: 5, y:y, type: PieceType.BITSHOP , team: teamType})
    initialBoardState.push({image: `icons/chess-knight-${type}.svg`, x: 6, y:y, type: PieceType.KNIGHT , team: teamType})
    initialBoardState.push({image: `icons/chess-rook-${type}.svg`, x: 7, y:y, type: PieceType.ROCK , team: teamType})

    }

    for(let i = 0; i < 8; i++){
        initialBoardState.push({image: 'icons/chess-pawn-solid.svg', x: i, y:6, type: PieceType.PAWN, team: TeamType.OPPONENT})
    }

    for(let i = 0; i < 8; i++){
        initialBoardState.push({image: 'icons/chess-pawn-regular.svg', x: i, y:1, type: PieceType.PAWN, team: TeamType.OUR})
    }


    for(let j = verticalAxis.length -1; j >= 0; j--){
        for(let i = 0; i < horizontalAxis.length; i++){
            const number = i + j + 2;
            let image = undefined;

            pieces.forEach((p) => {
                if(p.x === i && p.y === j){
                    image = p.image
                }
            })

            board.push(<Tile image={image} number={number} key={image + verticalAxis[j] + horizontalAxis[i]}/>)
        }
    }
    return <div  
            onMouseMove={(e) => movePiece(e)} 
            onMouseDown={e => grabPiece(e)} 
            onMouseUp={e => dropPiece(e)}
            ref={chessboardRef}
            id="shessboard">
                {board}
            </div>
}