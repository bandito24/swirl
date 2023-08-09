export default function returnLanguages(){
    return [
        "C++", "C", "CSS", "Go", "HTML", "Java", "JavaScript", "Kotlin", "Matlab",
        "NoSQL", "Perl", "PHP", "Python", "R", "Ruby", "Rust", "Scala", "SQL", "Swift", "TypeScript"
    ];
}

export const extractLanguageNames = (projectOrUser) => {
    const array = []
    projectOrUser.languages.forEach(lang => {
        array.push(lang.name)
    })
    return array.join(', ');
}
