import returnLanguages from "../functions/returnLanguages.js";
import {useState} from "react";

export default function SearchCategories({languages, setLanguages}) {
    const [showLanguages, setShowLanguages] = useState(false);
    const languageOptions = returnLanguages();

    function isSelected(value){
        return languages.includes(value)
    }
    const handleLanguageAdd = (e) => {
        const selectedLanguage = e.target.getAttribute('data-value');
        if(!isSelected(selectedLanguage)){
            setLanguages(prev => [
                ...prev, selectedLanguage
            ])
        } else {
            setLanguages(prev => prev.filter(lang => lang !== selectedLanguage))
        }

    }

    return(
    <div className="absolute" >
    <h1
    onClick={()=> {
        showLanguages === true ? setShowLanguages(false) : setShowLanguages(true);
    }}
    >Show Languages</h1>
    { showLanguages &&
    <ul
        className={`transform ${
            showLanguages ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
        } absolute top-0 left-0 w-full bg-gray-300 p-4 transition-all duration-250 ease-in-out`}
    >

        {languageOptions.map((option, index) => (
            <li key={index} className={`
            ${isSelected(option) ? 'bg-hover-blue' : ''}
            hover:cursor-pointer hover:bg-gray-400
            `}
            data-value={option}
            onClick={(e)=> handleLanguageAdd(e) }
            >{option}</li>
        ))
        }
    </ul>
    }
    </div>
    )
}
