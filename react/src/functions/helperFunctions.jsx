export function matchHighlight(input, matchValue) {

    const regex = new RegExp(`(${matchValue})`, 'i');
    const matchedInput = input.replace(regex, (match) => `<9538763>${match}<9538763>`);
    const splitInput = matchedInput.split('<9538763>')
    splitInput.splice(0, 1, '<span className="highlight">')
    splitInput.splice(0, 3, '</span>')


    return (
        <li className="cursor-pointer hover:text-blue-950 project-option" key={project.id}
            onClick={() => navigate(`/project/${project.slug}`)}>
            {regex.test(input) ? (
                input
            ) : (
                <>
                    {splitInput[0]} <span className="highlight"> {splitInput[1]} </span>{splitInput[2] || ''}
                </>
            )}
        </li>
    );

}
