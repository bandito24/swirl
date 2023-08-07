export default function ErrorList({ errors }) {
    return (
        <ul className="error-list-ul" >
            {errors.map((err, index) => (
                <li key={index} className='error text-red-500'>{err}</li>
            ))}
        </ul>
    );
}
