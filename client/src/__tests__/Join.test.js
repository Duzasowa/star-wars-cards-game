import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import Join from "../pages/Join";
import axios from "axios";

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
