import { Card, PageHeader } from "antd";
import { useSelector } from "react-redux";
import { getAnime } from "../AnimeList/redux/selectors";
import myImage from "../../_assets/img/Background.jpg";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
const Anime = (props) => {
  const anime = useSelector((state) => getAnime(state));
  const title = `${anime.title} -- Directed BY: ${anime.director}`;
  return (
    <StyledDesc>
      <StyledBox>
        <PageHeader onBack={() => props.history.push("/")} title="Back" />
        <h1 className="title">{title}</h1>
        <div className="mydiv">
          <img className="img" alt="img" src={anime?.image} />
          <p className="description">{anime.description}</p>
        </div>
      </StyledBox>
    </StyledDesc>
  );
};

const StyledDesc = styled.div`
  background-image: url(${myImage});
  width: 100%;
  display: flex;
`;
const StyledBox = styled.div`
  color: white;

  font-family: fantasy;
  font-weight: bolder;
  .title {
    color: white;
    text-align: center;
    margin-bottom: 13px;
  }
  .mydiv {
    display: flex;
  }
  .ant-page-header-heading-left {
    display: flex;
    margin-top: 50px;
  }
  .img {
    float: left;
    margin: auto auto auto 150px;
    width: 250px;
    text-align: center;
  }
  .description {
    color: white;
    font-size: 20px;
    float: right;
    padding: 0 190px 0 0;
    margin: 100px 190px 100px 10px;
  }
`;
export default withRouter(Anime);
