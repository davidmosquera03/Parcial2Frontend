import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Public from ".";
import "@testing-library/jest-dom";
import * as AuthContext from "../../context/AuthContext"; // adjust this path

// Mock the useAuth hook
jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    setIsLoggedIn: jest.fn(),
  }),
}));

describe("Public", () => {
  it("Has login and signup buttons", () => {
    render(<Public />);
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  });

  it("Renders Login component when Log in button is clicked", () => {
    render(<Public />);
    fireEvent.click(screen.getByRole("button", { name: "Log in" }));
    expect(screen.getByText("Your are logging in")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { id: "username" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { id: "password" })).toBeInTheDocument();
  });

  it("Renders Signup component when Signup button is clicked", () => {
    render(<Public />);
    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));
    expect(
      screen.getByRole("button", { name: "Register" })
    ).toBeInTheDocument();
  });
});
