import { Card, Rate, Table } from "antd";
import "antd/lib/table/style/css";
import "antd/lib/card/style/css";
import "antd/lib/rate/style/css";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { openAnime } from "../Pages/AnimeList/redux/actions";

import { withRouter } from "react-router-dom";

const StyledTable = ({ data, history }) => {
  const dispatch = useDispatch();
  const onClickRow = (record) => {
    dispatch(openAnime(record));
    history.push(`/anime/${record.id}`);
  };
  const columns = [
    {
      title: "Anime",
      dataIndex: "image",
      key: "image",
      render: (text) => {
        return <Card cover={<img alt="example" src={text} />} hoverable />;
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Director",
      dataIndex: "director",
      key: "director",
    },
    {
      title: "Release year",
      dataIndex: "release_date",
      key: "release_date",
    },
    {
      title: "Score",
      dataIndex: "rt_score",
      key: "rt_score",
      render: (x) => <Rate allowHalf defaultValue={(x * 5) / 100} />,
    },
  ];
  return (
    <StyledContext>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return {
            onClick: () => onClickRow(record),
          };
        }}
        scroll={{ y: 800 }}
        dataSource={data}
      />
    </StyledContext>
  );
};
const StyledContext = styled.div`
  width: 1080px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  .ant-table-container {
    border-collapse: collapse;
    margin: 25px 0;
    font-family: fantasy;
    font-size: large;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    .ant-table-thead > tr > th {
      background-color: #009879;
      color: #ffffff;
      text-align: left;
      width: 100px;
    }
    .ant-card-bordered {
      border: 0;
    }
    .ant-card-body {
      padding: 0;
    }
  }
  .ant-table-pagination.ant-pagination {
    padding: 0 0 450px 0;
  }
`;

export default withRouter(StyledTable);
