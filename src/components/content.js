import { useState,useEffect } from "react"
import data from "./data"
import { FiChevronRight,FiChevronLeft } from "react-icons/fi"
import { FaQuoteRight } from "react-icons/fa"

export default function Content() {
    const [people, setPeople] = useState(data)
    const [index, setIndex] = useState(0)
    useEffect(() => {
        const lastIndex = people.length - 1
        if (index < 0) {
            setIndex(lastIndex)
        }
        if (index > lastIndex) {
            setIndex(0)
        }
    }, [people, index])
    useEffect(() => {
        let slider = setInterval(() => {
            setIndex(index + 1)
        }, 5000);
        return () => clearInterval(slider)
    }, [index])
    return(
        <div className="section mt-5">
            
                <div className="mt-5 section-center">
                    {people.map((person, personIndex) => {
                        const { id,image,title,quote,name } = person
                        let position = 'nextSlide'
                        if (personIndex === index) {
                            position = 'activeSlide'
                        }
                        if( personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)) {
                            position = 'lastSlide'
                        }
                        return (
                            <article className={position} key={id}>
                                <img src={image} alt={name} />
                                <h4>{name}</h4>
                                <p className="title">{title}</p>
                                <p className="text">{quote}</p>
                                <FaQuoteRight className="icon" />
                            </article>
                        )
                    })}
                    <button onClick={() => setIndex(index - 1)} className="prev">
                        <FiChevronLeft />
                    </button>
                    <button onClick={() => setIndex(index + 1)} className="next">
                        <FiChevronRight />
                    </button>
                </div>
            
        </div>
    )
}