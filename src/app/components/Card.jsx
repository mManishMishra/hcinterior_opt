import "../../../public/style/style.css";
import Image from "next/image";
const Card = ({
    cardNameALl,
    imgSrc,
    imgClass,
    cardLinkName,
    imgAlt,
    titleCard,
    titleClass,
    spanTitle = null,
    // titleCard = null,
    // titleClass = "",
    descriptionCard,
    buttonTextCard,
    linkCard,
}) => {
    return (
        <div>
            <a href={cardLinkName}>
            <div className={cardNameALl}>
                <Image 
                    src={imgSrc || "/images/default.jpg"} 
                    className={imgClass} 
                    alt={imgAlt || "Card image"}
                    width={400}
                    height={300}
                    priority={false}
                    style={{ width: '100%', height: 'auto' }}
                 />
                {/* {imgSrc ? <img src={imgSrc} className="offerimg" alt={imgAlt} /> : null} */}
                <div className="px-3 pt-3 card-body">
                    <span>{spanTitle}</span>
                    <h5 className={titleClass}>{titleCard}</h5>
                    {descriptionCard ? <p className="">{descriptionCard}</p> : null}
                    {buttonTextCard ? <a href={linkCard} className="know_more">
                        {buttonTextCard}
                    </a> : null}
                </div>
            </div>
            </a>
        </div>
    );
};

export default Card;
