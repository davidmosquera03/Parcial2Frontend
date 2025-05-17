import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PostList from "./postlist";
import "@testing-library/jest-dom";

// Makes Mock fetch, localStorage, and window functions
global.fetch = jest.fn();
global.localStorage = {
  getItem: jest.fn(),
};
global.window.confirm = jest.fn();
global.alert = jest.fn();
global.prompt = jest.fn();

describe("PostList", () => {
  // 1 post with 2 likes and 1 reply to mock
  // not exactly equal but represents enough
  const mockPosts = {
    data: [
      {
        _id: "1",
        content: "Test post",
        createdAt: "2023-05-01T12:00:00Z",
        user: { name: "TestUser" },
        likes: ["user1", "user2"],
      },
      {
        _id: "2",
        content: "Reply post",
        createdAt: "2023-05-02T12:00:00Z",
        user: { name: "ReplyUser" },
        replyTo: { _id: "1", content: "Original post" },
        likes: [],
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Setup fetch mock
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockPosts),
      status: 200,
    });
  });
  it("renders posts when data is fetched", async () => {
    render(<PostList />);

    await waitFor(() => {
      expect(screen.getByText("TestUser:")).toBeInTheDocument();
      expect(screen.getByText("Test post")).toBeInTheDocument();
      expect(screen.getByText("In reply to:")).toBeInTheDocument();
      expect(screen.getByText("Original post")).toBeInTheDocument();
    });
  });

  it("handles like functionality", async () => {
    render(<PostList />);

    // This simulates showing a post with 2 likes from the mock data
    await waitFor(() => {
      expect(screen.getByText("❤️ Like (2)")).toBeInTheDocument();
    });

    // Simulate the like action and the expected updated data
    const updatedMockPosts = {
      data: [
        {
          _id: "1",
          content: "Test post",
          createdAt: "2023-05-01T12:00:00Z",
          user: { name: "TestUser" },
          likes: ["user1", "user2", "testUserId"], // <--- Added the test user's like
        },
        // ... other posts
      ],
    };

    fetch
      .mockResolvedValueOnce({
        status: 200, // Response for the like action
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(updatedMockPosts), // Return the updated data
        status: 200,
      });

    fireEvent.click(screen.getByText("❤️ Like (2)"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:8083/api/tweets/likes",
        expect.any(Object)
      );
    });

    await waitFor(() => {
      expect(screen.getByText("❤️ Like (3)")).toBeInTheDocument(); // Now you expect (3)
    });
  });
});
