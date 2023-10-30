import { IonIcon } from "@ionic/react";
import BackBtn from "../components/BackBtn";
import SchemeCard from "../components/SchemeCard";
import ToolBar from "../components/ToolBar";
import institute from "../assets/images/Icon/institute.svg";
import { optionsOutline } from "ionicons/icons";
import { useState, useContext, useEffect } from "react";
import lodash from "lodash";
import { SchemeContext } from "../context/SchemeContext";
import { AuthContext } from "../context/AuthContext";

const AllSchemes = () => {
  const { schemes, setSelectedScheme } = useContext(SchemeContext);
  const { user } = useContext(AuthContext);
  const [filterBy, setFilterBy] = useState({ type: [] });

  useEffect(() => {
    setSelectedScheme();
  }, []);

  return (
    <>
      <BackBtn />
      <div style={{ margin: "auto 20px" }}>
        <h2 style={{ marginBottom: "5px" }}>All Schemes</h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            marginBottom: "15px",
          }}
        >
          <span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "max-content",
              }}
            >
              Filter By&nbsp;
              <IonIcon
                icon={optionsOutline}
                style={{ width: "18px", height: "18px" }}
              />
              &nbsp;
            </div>
          </span>
          <div
            className="scrolling-wrapper"
            style={{
              margin: "auto -20px auto 0",
              paddingLeft: "15px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {[
              { name: "scholarship", value: "Scholarships", type: "both" },
              { name: "freeship", value: "Freeships", type: "student" },
              { name: "fellowship", value: "Fellowships", type: "both" },
              { name: "vc", value: "VC's", type: "both" },
            ]
              .filter((item) => {
                if (item.type == "both") {
                  return true;
                } else if (item.type == user.applicantType) {
                  return true;
                }
              })
              .map((item, count) => {
                return (
                  <div className="selector-item" key={count}>
                    <input
                      type="checkbox"
                      id={count}
                      name={count}
                      className="selector-item_radio"
                    />
                    <label
                      htmlFor={count}
                      className="selector-item_label"
                      onClick={() => {
                        let newArray;
                        if (!filterBy.type.includes(item.name)) {
                          newArray = [...filterBy.type, item.name];
                        } else {
                          newArray = lodash.remove(filterBy.type, (element) => {
                            return element != item.name;
                          });
                        }
                        setFilterBy({
                          ...filterBy,
                          type: newArray,
                        });
                      }}
                    >
                      {item.value}
                    </label>
                  </div>
                );
              })}
          </div>
        </div>

        {schemes
          .filter((item, index) => {
            item.index = index;
            if (filterBy.type.length == 0) {
              return true;
            } else {
              return filterBy.type.includes(item.type);
            }
          })
          .map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedScheme(schemes[item.index]);
                }}
              >
                <SchemeCard
                  sname={item.schemeName}
                  stype={item.type}
                  text={
                    "Deadline : " + new Date(item.deadline).toLocaleDateString()
                  }
                  img={institute}
                />
              </div>
            );
          })}
        <div style={{ height: "47px" }}></div>
      </div>
      <ToolBar />
    </>
  );
};

export default AllSchemes;
