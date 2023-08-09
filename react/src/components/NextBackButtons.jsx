// import {useNavigate} from "react-router-dom";

import {useLocation} from "react-router-dom";

export default function NextBackButtons({pageNumber, setPageNumber, lastPage, navigate}) {
    const currentURL = useLocation();

    const handlePageChange = (delta) => {
        setPageNumber(prev => prev + delta);
        const queryParams = new URLSearchParams(currentURL.search);
        queryParams.set('page', (pageNumber + delta).toString());
        const newURL = currentURL.pathname + '?' + queryParams.toString();
        navigate(newURL)
    }


    return(
    <>



    <div className="inline-flex absolute right-10 justify-end bg-white" >
        {pageNumber !== 1 && <p className="border-r-1 border-gray-700 text-blue-400 p-3 hover:cursor-pointer"
        onClick={()=>handlePageChange(-1)}
        >Previous</p>
        }
        {pageNumber !== lastPage && <p className="border-l border-gray-700 text-blue-400 p-3 hover:cursor-pointer"
       onClick={()=>handlePageChange(1)}
        >Next</p>}
    </div>
    </>
    )
}

