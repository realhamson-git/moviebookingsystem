export default ({ header = [], children }) => {
    return (
        <>
            <table className="table table-dark">
                <thead className="thead-dark">
                    <tr>
                        {
                            header.map((head, i) =>
                                <th scope="col">{ head }</th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    { children }
                    {/* <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr> */}
                </tbody>
            </table>
        </>

    )
}