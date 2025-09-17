import {useState} from 'react';
import styles from '../../styles/addToCartButton.module.css';

export default function AddToCartButton( {config}){
const [isClicked, setIsClicked] = useState(false);

const handleAddToCart = () => {
    setIsClicked(true);
    
    // Simulate adding to cart process. PROVISIONAL
    console.log ('Add to cart click with config:', config);

    setTimeout(() => {
        setIsClicked(false);
    }, 2000); // Reset after 2 seconds
};

return (
    <button 
        className={`${styles.addToCartButton} ${isClicked ? styles.clicked : ''}`} 
        onClick={handleAddToCart}
    >
        {isClicked ? 'Added to Cart!' : 'Add to Cart'}
    </button>
);

}