import styles from "../../styles/configurator.module.css";

export default function LoadingFallback() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingText}>Loading 3D Model...</div>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
}

// Alternative loading component with progress
export function DetailedLoadingFallback({ progress }) {
  return (
    <div className={`${styles.loadingContainer} ${styles.detailed}`}>
      <div className={styles.loadingContent}>
        <div className={styles.loadingTitle}>Loading...</div>
        <div className={styles.loadingSubtitle}>Preparing your 3D model</div>
      </div>

      {progress && (
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className={styles.loadingDots}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
}
