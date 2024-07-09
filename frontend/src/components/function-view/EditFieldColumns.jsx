/* eslint-disable react/prop-types */
import { Form } from "react-bootstrap";
import axios from "axios";

// Function to get file extension
function getFileExtension(filePath) {
    // Split the file path by periods
    const parts = filePath.split(".");
    // The last part will be the extension
    return parts[parts.length - 1];
}

const EditFieldColumns = ({ field, index, handleFunctionChange }) => {
    const handleFileView = async (filePath) => {
        const token = JSON.parse(localStorage.getItem("token"));
        const accessToken = token?.accessToken;
        const refreshToken = token?.refreshToken;

        try {
            console.log(filePath.substring(filePath.indexOf("/../data")));
            const response = await axios.get(
                `http://localhost:5005/api/v1/files?filePath=${filePath.substring(
                    filePath.indexOf("../data")
                )}`,
                {
                    responseType: "blob",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        RefreshToken: refreshToken,
                    },
                }
            );

            // Create a blob from the binary data received
            const blob = new Blob([response.data], {
                type: response.headers["content-type"],
            });

            // Create a URL for the blob
            const url = window.URL.createObjectURL(blob);

            // Open the file in a new tab
            window.open(url, "_blank");
        } catch (error) {
            console.log("Error downloading file. Please try again.", error);
        }
    };

    console.log(field);
    return (
        <div>
            <Form>
                {field?.fieldColumns?.map((fieldColumn, idx) => (
                    <Form.Group
                        key={`field-column-${idx}`}
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                    >
                        <Form.Label>{fieldColumn?.name}</Form.Label>
                        {fieldColumn?.largeText === true ? (
                            <Form.Control
                                as="textarea"
                                rows={3}
                                onChange={(e) =>
                                    handleFunctionChange(e, index, idx)
                                }
                                value={fieldColumn?.value}
                                name="value"
                            />
                        ) : fieldColumn?.type === "FILE" ? (
                            <>
                                {console.log(fieldColumn)}
                                {fieldColumn?.files?.map((file) => {
                                    const fileName = file.split("/").pop();
                                    const filesExtension =
                                        getFileExtension(file);
                                    let fileLogo = "/file-logo-img.jpeg";
                                    if (
                                        filesExtension.toLowerCase("xlsx") ||
                                        filesExtension.toLowerCase("csv")
                                    ) {
                                        fileLogo = "/excel-logo-img.png";
                                    } else if (
                                        filesExtension.toLowerCase("pdf")
                                    ) {
                                        fileLogo = "/pdf-logo-img.png";
                                    } else if (
                                        filesExtension.toLowerCase("docx") ||
                                        filesExtension.toLowerCase("word")
                                    ) {
                                        fileLogo = "/word-logo-img.avif";
                                    }
                                    return (
                                        <div
                                            key={`file-${idx}`}
                                            className="d-flex my-3"
                                            onClick={() => handleFileView(file)}
                                        >
                                            <div
                                                className="p-2"
                                                style={{ cursor: "pointer" }}
                                            >
                                                <img
                                                    src={fileLogo}
                                                    alt=""
                                                    width={70}
                                                />
                                                <p>
                                                    {fileName.replaceAll(
                                                        "%20",
                                                        " "
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                                <Form.Control type="file" size="sm" />
                            </>
                        ) : fieldColumn?.type === "BOOLEAN" ? (
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Check this switch"
                                onChange={(e) =>
                                    handleFunctionChange(e, index, idx)
                                }
                                checked={Boolean(fieldColumn?.value)}
                                name="value"
                            />
                        ) : (
                            <Form.Control
                                type={
                                    fieldColumn?.type === "STRING"
                                        ? "text"
                                        : fieldColumn?.type === "NUMBER"
                                        ? "number"
                                        : "date"
                                }
                                onChange={(e) =>
                                    handleFunctionChange(e, index, idx)
                                }
                                value={fieldColumn?.value}
                                name="value"
                            />
                        )}
                    </Form.Group>
                ))}
            </Form>
        </div>
    );
};

export default EditFieldColumns;
