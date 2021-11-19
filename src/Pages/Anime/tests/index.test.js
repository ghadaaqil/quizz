import { act, render, screen, waitFor } from "@testing-library/react";
import * as ReactRedux from "react-redux";
import AnimeList from "../index";
import store from "../../../store";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";
import { anime, animeInfos } from "./mocks";

beforeAll(() => {
  delete window.matchMedia;
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });
  jest.resetAllMocks();
});

test("should render Anime available in store", async () => {
  const useSelectorMock = jest.spyOn(ReactRedux, "useSelector");
  useSelectorMock.mockReturnValue(anime);
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <AnimeList />
        </Router>
      </Provider>
    );
  });

  const titleElmt = screen.getByText(animeInfos.title);
  const descElmt = screen.getByText(animeInfos.desc);
  const imgElmt = screen.getByAltText(animeInfos.img);
  await waitFor(() => expect(titleElmt).toBeInTheDocument());
  await waitFor(() => expect(descElmt).toBeInTheDocument());
  await waitFor(() => expect(imgElmt).toBeInTheDocument());
});
