import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useGetUsers } from "../../hooks/user";
import UserList from "./user-list";

const mockUsers = [
  { id: "1", name: "Teste 1", avatar: "avatar1.jpg", createdAt: "2025-01-01" },
  { id: "2", name: "Teste 2", avatar: "avatar2.jpg", createdAt: "2025-01-02" },
];

//Mock da mutation e do get
const mockMutate = jest.fn();

jest.mock("../../hooks/user", () => ({
    useGetUsers: jest.fn(),
    useDeleteUser: () => ({ mutate: mockMutate }),
    useEditUser: () => ({ mutate: jest.fn() }),
}));

const renderComponent = () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <UserList />
    </QueryClientProvider>
  );
};

describe("UserList Component", () => {
  beforeEach(() => {
    mockMutate.mockReset();
  });

  it("should render loading state", () => {
    (useGetUsers as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    });

    renderComponent();
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("should render error state", () => {
    (useGetUsers as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      data: null,
    });

    renderComponent();
    expect(screen.getByText("Ocorreu algum problema :(")).toBeInTheDocument();
  });

  it("should render list of users", () => {
    (useGetUsers as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockUsers,
    });

    renderComponent();

    mockUsers.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
    });
  });

  it("should call mutate when delete button is clicked", () => {
    (useGetUsers as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockUsers,
    });

    renderComponent();

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);

    expect(mockMutate).toHaveBeenCalledWith(
      { user: mockUsers[0] },
      expect.any(Object)
    );
  });

  it("should open UserEdit modal when edit button is clicked", () => {
    (useGetUsers as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockUsers,
    });

    renderComponent();

    const editButtons = screen.getAllByTestId("edit-button");
    fireEvent.click(editButtons[0]);

    // Espera que o nome do usuário apareça no modal como valor do input
    expect(screen.getByDisplayValue(mockUsers[0].name)).toBeInTheDocument();
  });
});
