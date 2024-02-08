import { useRef } from 'react';
import Tile from '../tile/Tile';
import './Chessboard.css'

const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalAxis = ['1','2','3','4','5','6','7','8']




export default function Chessboard(){
    const chessboardRef = useRef(null)
    let board = [];
    let pieces = []

    let activePiece = undefined

    function grabPiece(e){
    const element = e.target
    if(element.classList.contains('chess-piece')){

        const x = e.clientX-50;
        const y = e.clientY-50;

        element.style.position = 'absolute'
        element.style.left = `${x}px`
        element.style.top = `${y}px`

        activePiece = element;
    }
    }

    function movePiece(e){

    const chessboard = chessboardRef.current

    if(activePiece && chessboard){
        const minX = chessboard.offsetLeft-25;
        const minY = chessboard.offsetTop-25;

        const maxX = chessboard.offsetLeft + chessboard.clientWidth-75;
        const maxY = chessboard.offsetTop + chessboard.clientHeight-75;

        const x = e.clientX-50;
        const y = e.clientY-50;

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

    function dropPiece(e){
        if(activePiece){
            activePiece = undefined
        }
    }

    for(let p = 0; p < 2; p++){
        const type = p === 0 ? 'solid' : 'regular'
        const y = p === 0 ? 7 : 0

    pieces.push({image: `icons/chess-rook-${type}.svg`, x: 0, y:y})
    pieces.push({image: `icons/chess-knight-${type}.svg`, x: 1, y:y})
    pieces.push({image: `icons/chess-bishop-${type}.svg`, x: 2, y:y})
    pieces.push({image: `icons/chess-queen-${type}.svg`, x: 3, y:y})
    pieces.push({image: `icons/chess-king-${type}.svg`, x: 4, y:y})
    pieces.push({image: `icons/chess-bishop-${type}.svg`, x: 5, y:y})
    pieces.push({image: `icons/chess-knight-${type}.svg`, x: 6, y:y})
    pieces.push({image: `icons/chess-rook-${type}.svg`, x: 7, y:y})

    }

    for(let i = 0; i < 8; i++){
        pieces.push({image: 'icons/chess-pawn-solid.svg', x: i, y:6})
    }

    for(let i = 0; i < 8; i++){
        pieces.push({image: 'icons/chess-pawn-regular.svg', x: i, y:1})
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