import './Tile.css'

interface Props {
    image?: string,
    number: number
}
const Tile = ({image, number}: Props) => {

    if(number % 2 == 0){
        return(
            <div className='tile tile-green'>
                {/* <img src={image} alt="" width={50} height={50}/> */}
               {image && <div style={{backgroundImage: `url(${image})`}} className='chess-piece'></div>} 
            </div>
        ) 
    }else{
        return(
            <div className='tile tile-white'>
                {image && <div style={{backgroundImage: `url(${image})`}} className='chess-piece'></div>} 
            </div>  
        )
    }

}

export default Tile