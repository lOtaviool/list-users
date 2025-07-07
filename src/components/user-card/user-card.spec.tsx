import { fireEvent, render } from "@testing-library/react";
import UserCard from "./user-card";

const User = {
  id: "1",
  name: "Teste",
  avatar: "avatar.jpg",
  createdAt: "2023-01-01",
};

describe('UserCard Component', ()=>{

    it('Should render component',()=>{
        const {getByRole} = render(<UserCard user={User} onClickDelete={()=>{}} onClickEdit={()=>{}}/>)

        expect(getByRole('user-card')).toBeInTheDocument();
    })

    it("should call onClickEdit when edit button is clicked", () => {
        const handleEdit = jest.fn();
        const {getByTestId} = render(<UserCard user={User} onClickDelete={() => {}} onClickEdit={handleEdit} />);

        const editButton = getByTestId("edit-button"); 
        fireEvent.click(editButton);

        expect(handleEdit).toHaveBeenCalled();
    });

    it("should call onClickDelete when delete button is clicked", () => {
        const handleDelete = jest.fn();
        const {getByTestId} = render(<UserCard user={User} onClickDelete={handleDelete} onClickEdit={() => {}} />);

        const deleteButton = getByTestId("delete-button");
        fireEvent.click(deleteButton);

        expect(handleDelete).toHaveBeenCalled();
    });
})