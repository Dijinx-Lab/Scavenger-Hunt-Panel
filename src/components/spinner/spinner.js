import { RotatingLines } from 'react-loader-spinner'
import 'ldrs/ring'
import 'ldrs/lineSpinner'
import { lineSpinner } from 'ldrs'


// Default values shown  

function Spinner({ size = 20, stroke = 2, speed = 1, color = "white" }) {
    lineSpinner.register()
    return (
        
       
        
        // Default values shown
        <l-line-spinner
        size={size}
        stroke={stroke}
        speed={speed}
        color={color}
        >
            
        </l-line-spinner>
    );

}
export default Spinner;