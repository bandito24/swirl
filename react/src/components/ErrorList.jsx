export default function ErrorList({ errors }) {
    return (
        <div>
            {errors.map((err, index) => (
                <p key={index} className='error'>{err}</p>
            ))}
        </div>
    );
}
