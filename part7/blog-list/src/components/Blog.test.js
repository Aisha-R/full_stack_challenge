import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;

  let mockHandler;

  beforeEach(() => {
    const blog = {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 0,
      user: {
        name: "name",
        id: "id",
        username: "username",
      },
    };

    mockHandler = jest.fn();

    container = render(<Blog blog={blog} handleLike={mockHandler} />).container;
  });

  test("renders content", () => {
    const div = container.querySelector(".blog");

    expect(div).toHaveTextContent("First class tests");
    expect(div).toHaveTextContent("Robert C. Martin");

    const toggleDiv = container.querySelector(".hiddenInitially");
    expect(toggleDiv).toHaveStyle("display: none");
  });

  test("after clicking button, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const toggleDiv = container.querySelector(".hiddenInitially");
    expect(toggleDiv).not.toHaveStyle("display: none");
  });

  test("like button pressed twice, event handler called twice", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("like");
    await user.click(button);
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
