import styles from "./CustomCard.module.css";

interface CardProps {
    title: string;
    color: String;
    countColor: string;
    count: number;
    img: string;
}

const CustomCard = ({ title, color, countColor, count, img }: CardProps) => {
    return (
        // <div className={styles.card_container}>
        //     <Card>
        //         <h2 className={styles.card_title}>{`# ${title}`}</h2>
        //         <p style={{ color: `${color}`}} className={styles.card_count}>{count}</p>
        //         <div style={{ backgroundColor: `${countColor}`}} className={styles.card_img_container}>
        //             <img src={img} alt={title} />
        //         </div>
        //     </Card>
        // </div>

        <div className={styles.card_container}>
               <h2 className={styles.card_title}>{`# ${title}`}</h2>
               <p style={{ color: `${color}`}} className={styles.card_count}>{count}</p>
                <div style={{background: `${countColor}`}} className={styles.custome_cardimg_container}>
                    <img src={img} alt={title} />
                </div>
        </div>
    )
}

export default CustomCard