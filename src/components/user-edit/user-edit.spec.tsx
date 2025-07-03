import { render, screen, fireEvent } from "@testing-library/react";
import { UserEdit } from "./user-edit";
import { QueryClient, QueryClientProvider } from "react-query";

// Mock da mutation
const mockMutate = jest.fn();

jest.mock("../../hooks/user", () => ({
  useEditUser: () => ({
    mutate: mockMutate,
  }),
}));

const User = {
  id: "1",
  name: "Teste",
  avatar: "avatar.jpg",
  createdAt: "2025-01-01",
};

const renderComponent = (propsOverride = {}) => {
  const handleClose = jest.fn();
  const defaultProps = {
    show: true,
    user: User,
    handleClose,
    ...propsOverride,
  };

  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <UserEdit {...defaultProps} />
    </QueryClientProvider>
  );

  return { handleClose };
};

describe("UserEdit Component", () => {
    beforeEach(() => {
        mockMutate.mockClear();   
    });

    it("Should not render modal when show is false", () => {
        renderComponent({ show: false });

        const modalTitle = screen.queryByTestId('edit-modal');
        expect(modalTitle).not.toBeInTheDocument();
    });

    it("Should render modal when show is true", () => {
        renderComponent();

        const modalTitle = screen.getByTestId('edit-modal');
        expect(modalTitle).toBeInTheDocument();
    });

    it("Should update input value", () => {
        renderComponent();

        const input = screen.getByTestId("input-text");
        fireEvent.change(input, { target: { value: "New test" } });

        expect(input).toHaveValue("New test");
        });

        it("Should call handleClose when close-button is clicked", () => {
        const { handleClose } = renderComponent();

        const closeButton = screen.getByTestId("close-button");
        fireEvent.click(closeButton);

        expect(handleClose).toHaveBeenCalled();
    });

    it("Should call mutate when submit-button is clicked", () => {
        renderComponent();

        const mockMutate = jest.fn();
        (require("../../hooks/user") as any).useEditUser = () => ({
        mutate: mockMutate,
        });

        const saveButton = screen.getByTestId("submit-button");
        fireEvent.click(saveButton);

        expect(mockMutate).toHaveBeenCalledWith(
        { User, value: "Teste" },
        expect.any(Object)
        );
    });
});
