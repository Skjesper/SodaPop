import { useState } from 'react';
import styles from '../../styles/ingredientsDropdown.module.css';

export default function IngredientsDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const ingredients = [
    "Kolsyrat vatten",
    "Socker", 
    "Fruktjuice från koncentrat",
    "Naturliga aromer",
    "Syra (citronsyra)",
    "Färgämne",
    "Konserveringsmedel"
  ];

  return (
    <div className={styles.ingredientsContainer}>
      <button 
        className={styles.ingredientsButton}
        onClick={toggleDropdown}
        aria-label="View Ingredients"
      >
        <span className={styles.buttonText}>Ingredients</span>
        <span className={styles.cross}><img src="./assets/cross.svg" alt="cross icon" /></span>
      </button>
      
      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownContent}>
            <h3>Ingredients</h3>
            <div className={styles.ingredientsList}>
              {ingredients.map((ingredient, index) => (
                <div key={index} className={styles.ingredientItem}>
                  <span className={styles.ingredientName}>{ingredient}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}