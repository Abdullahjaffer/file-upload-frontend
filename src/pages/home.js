import { InboxOutlined } from "@ant-design/icons";
import { Alert, Button, notification, Result, Upload } from "antd";
import React from "react";

class Home extends React.Component {
  state = {
    fileList: [],
    uploading: false,
    result: null,
    error: null,
  };
  onFinish = (values) => {
    console.log(values);
  };

  handleUpload = () => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const formData = new FormData();
    formData.append("file", this.state.fileList[0]);
    fetch(proxyurl + "http://test.mydashboard.gq/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: formData,
    })
      .then(async (response) => {
        if (!response.ok) {
          const result = await response.json();
          console.log(result);
          throw new Error(result.error);
        }
        return response.json();
      })
      .then((v) => {
        console.log(v);
        if (v.success) {
          notification.success({
            message: v.message,
          });
          this.setState({
            result: v,
            error: null,
          });
        } else {
          notification.error({
            message: "Failed to add data",
          });
          this.setState({
            result: v,
            error: null,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          error: JSON.stringify(err, Object.getOwnPropertyNames(err)),
        });
      });
  };

  render() {
    const { fileList } = this.state;
    const props = {
      name: "file",
      multiple: false,
      showUploadList: {
        showDownloadIcon: false,
      },
      onRemove: (file) => {
        this.setState((state) => {
          return {
            fileList: [],
          };
        });
      },
      beforeUpload: (file) => {
        this.setState((state) => ({
          fileList: [file],
        }));
        return false;
      },
      fileList,
      accept: ".xlsx",
    };
    return (
      <React.Fragment>
        {this.state.error && (
          <Alert
            message="Error"
            description={JSON.stringify(this.state.error)}
            type="error"
            showIcon
          />
        )}
        {this.state.result ? (
          <Result
            status={this.state.result.success ? "success" : "error"}
            title={
              this.state.result.success
                ? "Successfully Added Data!"
                : "Upload sheet contains errors"
            }
            subTitle={
              this.state.result.success ? (
                `Data Id is : ${this.state.result.id}`
              ) : Array.isArray(this.state.result.message) ? (
                this.state.result.message.map((v) => <div>{v}</div>)
              ) : typeof this.state.result.message === "object" &&
                this.state.result.message !== null ? (
                <div>{JSON.stringify(this.state.result.message)}</div>
              ) : (
                <div>{this.state.result.message}</div>
              )
            }
            extra={[
              <Button
                onClick={() => {
                  this.setState({
                    result: null,
                    fileList: [],
                  });
                }}
              >
                {this.state.result.success ? "Add more" : "Try again"}
              </Button>,
            ]}
          />
        ) : (
          <React.Fragment>
            <Upload.Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Upload.Dragger>
            <Button style={{ width: "100%" }} onClick={this.handleUpload}>
              {this.state.fileList &&
              this.state.fileList[0] &&
              this.state.fileList[0].name
                ? this.state.fileList[0].name
                : "Click to Upload"}
            </Button>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
export default Home;
