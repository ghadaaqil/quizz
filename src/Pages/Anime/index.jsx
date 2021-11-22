import { Button, PageHeader, Result } from "antd";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { getAnime } from "../AnimeList/redux/selectors";
import myImage from "../../_assets/img/Background.jpg";

import "antd/lib/result/style/css";

const Anime = (props) => {
  const anime = useSelector((state) => getAnime(state));
  const title = `${anime?.title} -- Directed BY: ${anime?.director}`;
  const onBack = () => props.history.push("/");
  return (
    <StyledPage>
      {anime && (
        <StyledBox>
          <PageHeader onBack={onBack} title="Back" />
          <h1 className="title">{title}</h1>
          <div className="mydiv">
            <img className="img" alt="img" src={anime?.image} />
            <p className="description">{anime?.description}</p>
          </div>
        </StyledBox>
      )}
      {!anime && (
        <Result
          className="result"
          status="404"
          title="404"
          subTitle="Sorry, an error has occured. We can't find the anime!"
          extra={
            <Button type="primary" onClick={onBack}>
              Back Home
            </Button>
          }
        />
      )}
    </StyledPage>
  );
};

const StyledPage = styled.div`
  background-image: url(${myImage});
  width: 100%;
  display: flex;
  .result {
    text-align: center;
    margin: auto;
  }
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
