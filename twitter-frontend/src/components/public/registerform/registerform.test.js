import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "."; // adjust path as needed
import "@testing-library/jest-dom";

// Mock fetch
global.fetch = jest.fn();
global.alert = jest.fn();

describe("RegisterForm", () => {
  beforeEach(() => {
    fetch.mockClear();
    alert.mockClear();
  });

  it("renders all form inputs", () => {
    render(<RegisterForm register_url="test-url" />);
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your username")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("shows alert when passwords don't match", () => {
    render(<RegisterForm register_url="test-url" />);

    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "password456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(alert).toHaveBeenCalledWith("Passwords do not match!");
    expect(fetch).not.toHaveBeenCalled();
  });
});
