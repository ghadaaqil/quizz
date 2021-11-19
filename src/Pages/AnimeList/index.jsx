import StyledTable from "../../Components/StyledTable";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { getAllAnimes } from "../../apis";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { saveAnimes } from "./redux/actions";
import { getAnimes } from "./redux/selectors";

const { Search } = Input;

const AnimeList = () => {
  const [animes, setAnimes] = useState();
  const dispatch = useDispatch();
  const animesFromStore = useSelector((state) => getAnimes(state));
  useEffect(async () => {
    const animesList = await getAllAnimes();
    dispatch(saveAnimes(animesList));
    setAnimes(animesList);
  }, []);

  const onAnimeSearch = (input) => {
    const searchResult = animes?.data.filter((elemt) =>
      elemt.title.toLowerCase().includes(input.toLowerCase())
    );
    if (!searchResult?.length) setAnimes({ data: [] });
    if (!input.length) setAnimes({ data: animesFromStore });
    else setAnimes({ data: searchResult });
  };
  return (
    <div>
      <StyledLandingPage>
        <Search
          role="button"
          placeholder="Search your anime!"
          enterButton="Search"
          size="large"
          onSearch={onAnimeSearch}
        />
      </StyledLandingPage>
      <StyledTable data={animes?.data} />
    </div>
  );
};
const StyledLandingPage = styled.div`
  width: 1080px;
  .ant-input-search-with-button {
    float: right;
  }
  .ant-input-lg {
    height: 38px;
    border: aliceblue;
  }
  .ant-input-search-button {
    background-color: #009879;
  }
`;

export default AnimeList;
