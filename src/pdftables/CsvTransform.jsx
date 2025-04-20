
export default function CsvTransform({ setActiveStep }) {

    const csvLines = JSON.parse(localStorage.getItem("csvLines"));
    if (!csvLines || csvLines.length < 1) {
        return (
            <></>
        );
    }

    function nextButtonClicked() {
        // TODO
        alert('Coming soon')
    }

    return (
        <>
            <div className="container my-5">

                <div className="alert alert-info" role="alert">
                    Works in progress
                </div>

                <div className="text-end my-3">
                    <button type="button" className="btn btn-primary" onClick={nextButtonClicked}>Download CSV</button>
                </div>

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
            </div>
        </>
    );
}