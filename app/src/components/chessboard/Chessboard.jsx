import Tile from '../tile/Tile';
import './Chessboard.css'

const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalAxis = ['1','2','3','4','5','6','7','8']


export default function Chessboard(){
    let board = [];
    let pieces = []

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
    return <div id="shessboard">
                {board}
            </div>
}