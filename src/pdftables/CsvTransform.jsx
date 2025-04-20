
export default function CsvTransform({ setActiveStep }) {

    const csvLines = JSON.parse(localStorage.getItem("csvLines"));
    if (!csvLines || csvLines.length < 1) {
        return (
            <></>
        );
    }

    return (
        <>
            <table className="table table-striped">

                <thead>
                    <tr>
                        {
                            csvLines[0].map((column) => (
                                <th>{ column }</th>
                            ))
                        }
                    </tr>
                </thead>

                <tbody>
                {
                    csvLines.splice(1).map(function(csvLine) {
                        return (
                            <tr>
                                {
                                    csvLine.map((column) => (
                                        <td>{ column }</td>
                                    ))
                                }
                            </tr>
                        )
                    })
                }
                </tbody>

            </table>
        </>
    );
}