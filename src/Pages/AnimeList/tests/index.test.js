import { act, render, screen, waitFor } from "@testing-library/react";
import * as ReactRedux from "react-redux";
import AnimeList from "../index";
import store from "../../../store";
import axios from "axios";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";
import { animes } from "./mocks";
import userEvent from "@testing-library/user-event";
import * as Actions from "../redux/actions";

jest.mock("axios");
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

test("Renders no data when there's no anime available", async () => {
  const promise = Promise.resolve({ data: [] });
  axios.get.mockImplementationOnce(() => promise);
  const useSelectorMock = jest.spyOn(ReactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(ReactRedux, "useDispatch");
  useSelectorMock.mockReturnValue(jest.fn());
  useDispatchMock.mockReturnValue(jest.fn());
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <AnimeList />
        </Router>
      </Provider>
    );
  });

  const msgElement = screen.getByText("No Data");
  await waitFor(() => expect(msgElement).toBeInTheDocument());
});

test("Renders anime list", async () => {
  const promise = Promise.resolve({ data: animes });
  axios.get.mockImplementationOnce(() => promise);
  const useSelectorMock = jest.spyOn(ReactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(ReactRedux, "useDispatch");
  useSelectorMock.mockReturnValue(jest.fn());
  useDispatchMock.mockReturnValue(jest.fn());
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <AnimeList />
        </Router>
      </Provider>
    );
  });
  const items = await screen.findAllByAltText("example");
  await waitFor(() => expect(items).toHaveLength(2));
});
test("Renders the matching animes list when searching a string", async () => {
  const promise = Promise.resolve({ data: animes });
  axios.get.mockImplementationOnce(() => promise);
  const useSelectorMock = jest.spyOn(ReactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(ReactRedux, "useDispatch");
  useSelectorMock.mockReturnValue(jest.fn());
  useDispatchMock.mockReturnValue(jest.fn());
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <AnimeList />
        </Router>
      </Provider>
    );
  });

  const items = await screen.findAllByAltText("example");
  await waitFor(() => expect(items).toHaveLength(2));
  userEvent.type(screen.getByPlaceholderText("Search your anime!"), "tot");
  userEvent.click(screen.getByText(/Search/));
  const newItems = await screen.findAllByAltText("example");
  await waitFor(() => expect(newItems).toHaveLength(1));
});
test("Renders anime list when searching an empty string", async () => {
  const promise = Promise.resolve({ data: animes });
  axios.get.mockImplementationOnce(() => promise);
  const useSelectorMock = jest.spyOn(ReactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(ReactRedux, "useDispatch");
  useSelectorMock.mockReturnValue(animes);
  useDispatchMock.mockReturnValue(jest.fn());
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <AnimeList />
        </Router>
      </Provider>
    );
  });

  const items = await screen.findAllByAltText("example");
  await waitFor(() => expect(items).toHaveLength(2));
  userEvent.type(screen.getByPlaceholderText("Search your anime!"), "");
  userEvent.click(screen.getByText(/Search/));
  const newItems = await screen.findAllByAltText("example");
  await waitFor(() => expect(newItems).toHaveLength(2));
});
test("Renders anime list when there's no matching anime", async () => {
  const promise = Promise.resolve({ data: animes });
  axios.get.mockImplementationOnce(() => promise);

  const useSelectorMock = jest.spyOn(ReactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(ReactRedux, "useDispatch");
  useSelectorMock.mockReturnValue(jest.fn());
  useDispatchMock.mockReturnValue(jest.fn());
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <AnimeList />
        </Router>
      </Provider>
    );
  });

  const items = await screen.findAllByAltText("example");
  await waitFor(() => expect(items).toHaveLength(2));
  userEvent.type(screen.getByPlaceholderText("Search your anime!"), "zzzzzz");
  userEvent.click(screen.getByText(/Search/));
  const linkElement = screen.getByText("No Data");
  await waitFor(() => expect(linkElement).toBeInTheDocument());
});

test("triggers redux action with right anime", async () => {
  const promise = Promise.resolve({ data: animes });
  axios.get.mockImplementationOnce(() => promise);

  const useSelectorMock = jest.spyOn(ReactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(ReactRedux, "useDispatch");
  useSelectorMock.mockReturnValue(jest.fn());
  useDispatchMock.mockReturnValue(jest.fn());
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <AnimeList />
        </Router>
      </Provider>
    );
  });
  const openAnime = jest.spyOn(Actions, "openAnime");
  const items = await screen.findAllByAltText("example");

  await waitFor(() => expect(items).toHaveLength(2));
  const rowIds = screen.getByText("My Neighbor Totoro");
  userEvent.click(rowIds);
  expect(openAnime).toHaveBeenCalledTimes(1);
  expect(openAnime).toBeCalledWith({ ...animes[0] });
});
