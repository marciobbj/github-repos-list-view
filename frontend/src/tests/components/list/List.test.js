import React, { useState } from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import List from "../../../components/list";
afterEach(cleanup);

describe("test the List component", () => {
  // mocked state to pass as prop.
  let username = null;
  const testUsernameHandler = (uname) => {
    username = uname;
  };

  it("initializes with the searchbar enabled if repositories length is greater than 0", () => {
    const { getByPlaceholderText } = render(
      <List
        repositories={[
          {
            name: "nice",
            url: "test-url",
            description: "nice-description",
          },
        ]}
      />
    );
    // assert the search bar is on
    expect(getByPlaceholderText("Search..."));
  });

  it("all items of the array are being displayed properly", () => {
    const { getByPlaceholderText, getByText } = render(
      <List
        repositories={[
          {
            name: "nice",
            url: "test-url",
            description: "nice-description",
          },
          {
            name: "nice_two",
            url: "test-url-two",
            description: "nice-two-description",
          },
          {
            name: "nice_three",
            url: "test-url-three",
            description: "nice-three-description",
          },
        ]}
      />
    );
    // assert the search bar is on
    expect(getByPlaceholderText("Search..."));
    expect(getByText("nice"));
    expect(getByText("nice_two"));
    expect(getByText("nice_three"));
  });
});
