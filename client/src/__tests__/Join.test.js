import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import Join from "../pages/Join";

test("should render Join component with a text field and two buttons", () => {
  render(
    <BrowserRouter>
      <Join />
    </BrowserRouter>
  );

  const textField = screen.getByRole("textbox");
  const joinButton = screen.getByRole("button", { name: /join/i });
  const resetButton = screen.getByRole("button", { name: /reset/i });

  expect(textField).toBeInTheDocument();
  expect(joinButton).toBeInTheDocument();
  expect(resetButton).toBeInTheDocument();
});

test("should show an error message if the name is too short", () => {
  render(
    <BrowserRouter>
      <Join />
    </BrowserRouter>
  );

  const textField = screen.getByRole("textbox");
  const joinButton = screen.getByRole("button", { name: /join/i });

  fireEvent.change(textField, { target: { value: "bob" } });
  fireEvent.click(joinButton);

  expect(
    screen.getByText(/name must be between 5 and 15 characters long/i)
  ).toBeInTheDocument();
});

test("should show an error message if the name is too long", () => {
  render(
    <BrowserRouter>
      <Join />
    </BrowserRouter>
  );

  const textField = screen.getByRole("textbox");
  const joinButton = screen.getByRole("button", { name: /join/i });

  fireEvent.change(textField, { target: { value: "johndoe1234567890" } });
  fireEvent.click(joinButton);

  expect(
    screen.getByText(/name must be between 5 and 15 characters long/i)
  ).toBeInTheDocument();
});

test("should show a success message if the name is valid and the request is successful", async () => {
  const mockResponse = { success: true };
  jest.spyOn(global, "fetch").mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockResponse),
  });

  render(
    <BrowserRouter>
      <Join />
    </BrowserRouter>
  );

  const textField = screen.getByRole("textbox");
  const joinButton = screen.getByRole("button", { name: /join/i });

  fireEvent.change(textField, { target: { value: "johndoe" } });
  fireEvent.click(joinButton);

  expect(
    await screen.findByText(/query processed successfully!/i)
  ).toBeInTheDocument();

  global.fetch.mockRestore();
});

test("should show an error message if the request fails", async () => {
  const error = new Error("Failed to fetch");
  jest.spyOn(global, "fetch").mockRejectedValueOnce(error);

  render(
    <BrowserRouter>
      <Join />
    </BrowserRouter>
  );

  const textField = screen.getByRole("textbox");
  const joinButton = screen.getByRole("button", { name: /join/i });

  fireEvent.change(textField, { target: { value: "johndoe" } });
  fireEvent.click(joinButton);

  expect(
    await screen.findByText(/failed to process query/i)
  ).toBeInTheDocument();

  global.fetch.mockRestore();
});
