import styled from "styled-components";
import {useDeleteUser, useGetUsers} from "../hooks/user";
import UserCard from "./user-card";
import { useState } from "react";
import { UserEdit } from "./user-edit";
import { useQueryClient } from "react-query";
import type { User } from "../types/user.type";

const Container = styled.div`
  display: flex;
  align-items: center;
  display: grid;
  padding: 0 20px;
`;

export default function UserList() {
    const {data, isLoading, isError} = useGetUsers();
    const {mutate} = useDeleteUser();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const queryClient = useQueryClient();
    

    const handleDelete = (user: User) =>{
        mutate(
            { user: user},
            {
                onSuccess: () => {
                    queryClient.invalidateQueries("user-list");
                    console.log("Delected with success!")
                }
            }
        );
    }

    return(
        <Container>
            {isLoading && <h3>Carregando...</h3>}
            {isError && <h3>Ocorreu algum problema :(</h3>}
            {data?.map((user: User, index) => (
                <UserCard 
                    key={index}
                    user={user} 
                    onClickEdit={() => setSelectedUser(user)}
                    onClickDelete={()=> handleDelete(user)}
                />
            ))}
            {selectedUser && (
                <UserEdit
                    user={selectedUser}
                    show={!!selectedUser}
                    handleClose={() => setSelectedUser(null)}
                />
            )}
        </Container>
    )
}