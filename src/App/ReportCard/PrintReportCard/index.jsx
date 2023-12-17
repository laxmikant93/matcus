import React from "react";
import DummyProfile from "../DummyProfile.png";
import DummyLogo from "./demo-logo.jpg";
const PrintReportCard = () => {
  return (
    <React.Fragment>
      <div
        style={{
          margin: "0 auto",
          width: "100%",
          "max-width": "768px",
          padding: "20px 0",
          position: "relative",
        }}
      >
        <table
          style={{
            "font-family": "helvetica, arial, sans-serif",
            "text-align": "center",
            "border-collapse": "collapse",
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th colSpan="2" style={{ "text-align": "left" }}>
                <img src={DummyLogo} alt="Logo" width="250" border="none" />
              </th>
            </tr>
            <tr
              style={{
                borderWidth: "3px",
                borderBottomStyle: "double",
                paddingBottom: "5px",
              }}
            >
              <th style={{ "text-align": "left" }}>
                <h1 style={{ fontSize: "28px", fontWeight: "600" }}>
                  DAV Public School, Dwarka
                </h1>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "300",
                    marginTop: "5px",
                  }}
                >
                  Vishwa Marina, Sector-9, Berhampur, Odisha - 880078 India
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "300",
                    marginTop: "3px",
                  }}
                >
                  Website:&nbsp;&nbsp;<strong>www.davpublicschool.com</strong>
                  &nbsp;&nbsp;&nbsp;&nbsp;Contact:&nbsp;&nbsp;
                  <strong>+91 88001 12233</strong>
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "300",
                    marginTop: "3px",
                  }}
                >
                  <span>Affiliated to C.B.S.E (New Delhi)</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>DLDPS39/7859/2021</span>
                </p>
              </th>
              <th style={{ float: "right" }}>
                <img
                  src={DummyProfile}
                  alt="Profle"
                  width="100"
                  border="none"
                />
              </th>
            </tr>
            <tr>
              <th colSpan="2" style={{ "text-align": "left" }}>
                <p
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    marginTop: "25px",
                  }}
                >
                  Akansha Negi
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                  }}
                >
                  S/O:&nbsp;<strong>Ankit Negi</strong>
                </p>
              </th>
            </tr>
            <tr
              style={{
                borderWidth: "1px",
                borderBottomStyle: "solid",
                paddingBottom: "5px",
              }}
            >
              <th style={{ "text-align": "left" }}>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                    marginTop: "15px",
                  }}
                >
                  <span style={{ width: "60px" }}>Class:</span>&nbsp;
                  <strong>8/B/2021</strong>
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                  }}
                >
                  <span style={{ width: "60px" }}>Roll No:</span>&nbsp;
                  <strong>DW005778</strong>
                </p>
              </th>

              <th style={{ "text-align": "left" }}>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                    marginTop: "15px",
                  }}
                >
                  <span style={{ width: "60px" }}>Session:</span>&nbsp;{" "}
                  <strong>2019 - 2020</strong>
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                  }}
                >
                  <span style={{ width: "60px" }}>Admn No.:</span>&nbsp;
                  <strong>DL/DAVDW/8B0005778</strong>
                </p>
              </th>
            </tr>
          </thead>
        </table>
        <table
          style={{
            "font-family": "helvetica, arial, sans-serif",
            "text-align": "center",
            width: "100%",
            borderWidth: "1px",
            borderColor: "#AEAEAE",
            borderStyle: "solid",
            backgroundColor: "#F2F2F2",
            marginTop: "50px",
            borderSpacing: "30px",
          }}
        >
          <thead
            style={{
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            <tr
              style={{
                borderBottomWidth: "1px",
                borderColor: "#AEAEAE",
                borderStyle: "solid",
                backgroundColor: "#E1E1E1",
              }}
            >
              <th
                rowSpan="2"
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                }}
                height="30px"
                width="150px"
              >
                Subjects
              </th>
              <th
                colSpan="2"
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                }}
                height="30px"
              >
                Term1
              </th>
              <th
                colSpan="2"
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                }}
              >
                Term2
              </th>
              <th
                colSpan="2"
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                }}
              >
                Finals
              </th>
              <th
                rowSpan="2"
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                  padding: "10px",
                }}
              >
                Remarks
              </th>
              <th
                rowSpan="2"
                style={{
                  border: "none",
                  padding: "10px",
                }}
              >
                Grades
              </th>
            </tr>
            <tr
              style={{
                borderBottomWidth: "1px",
                borderColor: "#AEAEAE",
                borderStyle: "solid",
                backgroundColor: "#E1E1E1",
              }}
            >
              <th
                width="80px"
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                }}
                height="30px"
              >
                Total
              </th>
              <th
                width="80px"
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                }}
                height="30px"
              >
                Obt.
              </th>
              <th
                width="80px"
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                }}
                height="30px"
              >
                Total
              </th>
              <th
                width="80px"
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                }}
                height="30px"
              >
                Obt.
              </th>
              <th
                width="80px"
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                }}
                height="30px"
              >
                Total
              </th>
              <th
                width="80px"
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                }}
                height="30px"
              >
                Obt.
              </th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "12px", textAlign: "center" }}>
            <tr
              style={{
                borderBottomWidth: "1px",
                borderColor: "#AEAEAE",
                borderStyle: "solid",
              }}
            >
              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                  padding: "10px",
                }}
                width="150px"
              >
                Maths
              </td>

              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                  padding: "10px",
                }}
              >
                100
              </td>
              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                  padding: "10px",
                }}
              >
                <strong>60</strong>
              </td>

              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                  padding: "10px",
                }}
              >
                100
              </td>
              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                  padding: "10px",
                }}
              >
                <strong>60</strong>
              </td>

              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                  padding: "10px",
                }}
              >
                100
              </td>
              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                  padding: "10px",
                }}
              >
                <strong>60</strong>
              </td>
              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                  padding: "10px",
                }}
              >
                Good
              </td>
              <td
                style={{
                  border: "none",
                  padding: "10px",
                }}
              >
                <strong>A</strong>
              </td>
            </tr>
            <tr
              style={{
                borderBottomWidth: "1px",
                borderColor: "#AEAEAE",
                borderStyle: "solid",
              }}
            >
              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                  padding: "10px",
                }}
                width="150px"
              >
                Maths
              </td>

              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                  padding: "10px",
                }}
              >
                100
              </td>
              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                  padding: "10px",
                }}
              >
                <strong>60</strong>
              </td>

              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                  padding: "10px",
                }}
              >
                100
              </td>
              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                  padding: "10px",
                }}
              >
                <strong>60</strong>
              </td>

              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                  padding: "10px",
                }}
              >
                100
              </td>
              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                  padding: "10px",
                }}
              >
                <strong>60</strong>
              </td>
              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                  padding: "10px",
                }}
              >
                Good
              </td>
              <td
                style={{
                  border: "none",
                  padding: "10px",
                }}
              >
                <strong>A</strong>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr
              style={{
                border: "none",
                backgroundColor: "#E1E1E1",
                fontSize: "14px",
              }}
            >
              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                }}
                height="40px"
                width="150px"
              >
                <strong>Total</strong>
              </td>

              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                }}
                height="40px"
              >
                100
              </td>
              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                }}
                height="40px"
              >
                <strong>60</strong>
              </td>

              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                }}
                height="40px"
              >
                100
              </td>
              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                }}
                height="40px"
              >
                <strong>60</strong>
              </td>
              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                }}
                height="40px"
              >
                100
              </td>
              <td
                style={{
                  borderRightWidth: "1px",
                  borderColor: "#AEAEAE",
                  borderStyle: "solid",
                }}
                height="40px"
              >
                <strong>60</strong>
              </td>
              <td
                style={{
                  border: "none",
                  backgroundColor: "#000",
                  color: "#fff",
                }}
                height="30px"
                width="150px"
                colSpan="2"
              >
                98.90 %
              </td>
            </tr>
          </tfoot>
        </table>
        <table
          style={{
            marginTop: "50px",
          }}
        >
          <tbody>
            <tr
              style={{
                borderWidth: "3px",
                borderBottomStyle: "double",
                paddingBottom: "5px",
              }}
            >
              <td
                style={{
                  textAlign: "left",
                  paddingLeft: "30px",
                  paddingBottom: "5px",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  Class Teacher
                </div>
              </td>
              <td
                style={{
                  textAlign: "Right",
                  paddingRight: "30px",
                  paddingBottom: "5px",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  Principal
                </div>
              </td>
            </tr>
            <tr
              style={{
                paddingBottom: "20px",
              }}
            >
              <td
                style={{
                  textAlign: "left",
                  paddingTop: "5px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  22 Jan, 2020 8:40 AM
                </div>
              </td>
              <td
                style={{
                  textAlign: "Right",
                  paddingTop: "5px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  1/3
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            position: "absolute",
            top: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontSize: "28px",
              fontWeight: "800",
              color: "rgba(0, 0, 0, 0.1)",
              zIndex: "0",
              transform: "rotate(-45deg)",
            }}
          >
            DAV Public School, Dwarka
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PrintReportCard;
