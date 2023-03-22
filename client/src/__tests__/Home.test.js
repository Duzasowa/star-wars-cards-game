import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import Home from "../pages/Home";
import { BrowserRouter } from "react-router-dom";

jest.mock("axios");

test("should fetch users data and display number of users", async () => {
  const mockData = { result: 10 };
  axios.get.mockResolvedValueOnce({ data: mockData });

  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  await waitFor(() =>
    expect(screen.getByText("Players: 10")).toBeInTheDocument()
  );
});
