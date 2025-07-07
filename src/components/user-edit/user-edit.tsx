import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useQueryClient } from "react-query";
import type { User } from "../../types/user.type";
import { useEditUser } from "../../hooks/user";

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
    <Modal data-testid="edit-modal" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Atualizar Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Nome</Form.Label>
        <Form.Control
          data-testid="input-text"
          onChange={(e) => setValue(e.target.value)}
          type="text"
          value={value}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button data-testid="close-button" variant="outline-dark" onClick={handleClose}>
          Fechar
        </Button>
        <Button data-testid="submit-button" variant="dark" onClick={() => handleSubimit()}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
