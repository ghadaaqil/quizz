import { Button, Card } from "antd";
import styled from "styled-components";
export default (props) => (
  <StyledButton>
    <Button
      {...props}
      icon={<Card cover={<img alt="example" src={props.content} />} />}
    />
  </StyledButton>
);

const StyledButton = styled.div`
  .ant-card-bordered {
    border: 0;
  }
  .ant-card-body {
    padding: 0;
  }
  .ant-btn-icon-only {
    width: 150px;
    height: 32px;
    padding: 2.4px 0;
    font-size: 16px;
    border-radius: 2px;
    vertical-align: -3px;
  }
`;
