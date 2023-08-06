import returnLanguages from "../functions/returnLanguages.js";
import React from 'react';

export default function LanguagesBundle({ tag }) {
const languages = returnLanguages()

    return (
        <>
            {languages.map((language, index) => React.createElement(tag, { key: index, 'data-value': language }, language))}
        </>
    );
}
