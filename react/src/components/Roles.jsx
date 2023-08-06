export default function Roles({roles}) {
    return(
    <>
        <div>
        <h2>Requested Roles:</h2><br/>
        {roles.map((role, index) => (
            <p key={index}>{role}</p>
        ))}
        </div>
    </>
    )
}
