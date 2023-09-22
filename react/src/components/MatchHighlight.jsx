import {useNavigate} from "react-router-dom";


export default function MatchHighlight({input, matchValue, project}) {
    const navigate = useNavigate();
    let index = matchValue.indexOf(input)



        return (
        <li className="cursor-pointer hover:text-blue-950 project-option" key={project.id}
            onClick={() => navigate(`/project/${project.slug}`)}>
            {matchValue.substring(0, index)}<span className='highlight-match'>{matchValue.substring(index, index+input.length)}</span>{matchValue.substring(index+input.length)}
        </li>
    );

}
