import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useQueryClient } from "react-query";
import { useEditUser } from "../hooks/user";
import type { User } from "../types/user.type";

interface Props {
  show: boolean;
  user: User;
  handleClose: () => void;
}

export function UserEdit({ show, handleClose, user }: Props) {
  const [value, setValue] = useState(user.name);
  const queryClient = useQueryClient();

  const { mutate } = useEditUser()

  const handleSubimit = () =>{

    mutate(
        { user: user, value },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("user-list");
                handleClose();
            }
        }
    );
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Atualizar Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Nome</Form.Label>
        <Form.Control
          onChange={(e) => setValue(e.target.value)}
          type="text"
          value={value}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={() => handleSubimit()}>
          {"Salvar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
