import { IoPerson } from "react-icons/io5";
import { Button, Modal } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { UpdateUsernameForm } from "./update-username-form";
import { useState } from "react";

interface ProfileHeroProps {
    username: string;
}

export function ProfileHero({ username }: ProfileHeroProps) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <>
        <div
            className="bg-background-gray d-flex flex-column justify-content-center align-items-center gap-2 shadow-sm rounded p-4"
            style={{ height: '20rem', maxWidth: '90%', margin: '0 auto' }}
        >
            <div className="bg-background-avatar rounded-circle d-flex justify-content-center align-items-center" style={{ width: '8rem', height: '8rem' }}>
                <IoPerson className="text-white" size={80} />
            </div>
            <div>
                <p className="text-black fw-bold fs-4">{username}</p>
            </div>
            <Button onClick={handleShow} className="bg-transparent border-2 border-black text-text d-flex align-items-center justify-content-center gap-2">
                <MdEdit />
                Edit Profile
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateUsernameForm onSuccess={handleClose} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="update-username-form"
                        variant="primary"
                        className="text-white"
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </>
}
