import {useState} from "react";

export default function SetLanguages({setViewState, setUserInformation}) {
    const [selectedLanguages, setSelectedLanguages] = useState([])
    const languages = [
        "C++",
        "C",
        "CSS",
        "Go",
        "HTML",
        "Java",
        "JavaScript",
        "Kotlin",
        "Matlab",
        "NoSQL",
        "Perl",
        "PHP",
        "Python",
        "R",
        "Ruby",
        "Rust",
        "Scala",
        "SQL",
        "Swift",
        "TypeScript"
    ];

    const proceedToNextPage = (e) => {
        e.preventDefault()
        setUserInformation((prev)=> ({
        ...prev,
        languages: selectedLanguages
        }))
        setViewState('accountInformation')

    }

    const addToLanguages = (e) => {


        const selected = e.target.tagName === 'div' ?
            e.target
            :
            e.target.closest('div');
        const selectedValue = selected.getAttribute('data-value')
        if(selected.getAttribute('id') === 'root'){
            return
        }

        if (selectedLanguages.includes(selectedValue)) {
            setSelectedLanguages(() => selectedLanguages.filter(val =>
                val !== selectedValue
            ))
            selected.style.backgroundColor = 'initial';
        } else {
            setSelectedLanguages(prev =>
                [...prev, selectedValue]
            )
            selected.style.backgroundColor = 'hsla(180, 47%, 56%, .5)'
        }

    }

    return (
        <>
            <h2>Please select the languages that you are familiar with or want to learn more about</h2>
            <p>(If you don't see your language here, you can add it manually on your home page)</p>
            <h3>Next we'll move onto frameworks and libraries</h3>
            <section className="language-selects absolute mx-auto translate-y-6" >
                {selectedLanguages.map((lang, index) => (
                    <p key={index} className="">{lang}{
                        index !== selectedLanguages.length - 1 && selectedLanguages.length > 1 ? "," : ''
                    } </p>
                ))
                }
            </section>

            <section className='languages-grid' onClick={addToLanguages}>
                {languages.map((lang, index) => (
                    <div key={index} data-value={lang} className="language-select flex items-center justify-center">
                        <p className="language-text">{lang}</p>
                    </div>
                ))
                }
            </section>

            <button className="proceed-btn" onClick={proceedToNextPage}>Continue</button>
        </>
    )
}
