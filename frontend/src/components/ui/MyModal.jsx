import { Modal } from "react-bootstrap";
import Button from "./Button";

const MyModal = ({
    children,
    modalHeading = "Modal heading",
    showModalHeader = true,
    showModalFooter = false,
    showBackBtn = true,
    handleContinue = () => {},
    handleBack = () => {},
    ...props
}) => {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop={"static"}
        >
            {showModalHeader && (
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {modalHeading}
                    </Modal.Title>
                </Modal.Header>
            )}
            <Modal.Body style={{ maxHeight: "350px", overflow: "auto" }}>
                {children}
            </Modal.Body>
            {showModalFooter && (
                <Modal.Footer>
                    {showBackBtn && (
                        <Button variant="secondary" handleClick={handleBack}>
                            Back
                        </Button>
                    )}
                    <Button handleClick={handleContinue} continueBtnProps>
                        Continue
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
};

export default MyModal;
