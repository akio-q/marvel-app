import AppBanner from '../../appBanner/AppBanner';

import './singleCharacterPage.scss';

const SingleCharacterPage = () => {
    return (
        <>
            <AppBanner />
            <div className="single-character">
                <img src='https://assetsio.reedpopcdn.com/326170248_544774687708630_4489341595753110592_n-(1).jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp' alt='Loki' className="single-character__img" />
                <div>
                    <h2 className="single-character__name">LOKI</h2>
                    <p className="single-character__descr">In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.</p>
                </div>
            </div>
        </>
    )
}

export default SingleCharacterPage; 