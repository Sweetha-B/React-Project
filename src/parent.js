import axios from "axios";
import React, { useEffect, useState } from "react";
import { deleteUrl, GetUrl, postUrl } from "./url";

const Parent = () => {
  const [data, setdata] = useState([]);
  const [num, setnum] = useState(0);

  const [toggle, settoggle] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  // userData get method

  function GetData() {
    axios
      .get(GetUrl)
      .then((res) => {
        console.log(res.data);

        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    GetData();
  }, [toggle]);

  console.log(data);

  //   userdata added in api
  function handle(e) {
    e.preventDefault();
    console.log("hi");

    if (userData.name === "" || userData.email === "") {
      alert("pls fill nout this field");
    } else {
      axios
        .post(postUrl, { name: userData.name, email: userData.email })
        .then(() => {
          setUserData((userData) => ({ ...userData, name: "" }));
          setUserData((userData) => ({ ...userData, email: "" }));

          settoggle(!toggle);

          console.log("data added");
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }

  function deleteDataFun(id) {
    console.log(id);
    axios
      .delete(`${deleteUrl}/${id}`)
      .then(() => {
        settoggle(!toggle);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <form onSubmit={handle}>
        <input
          type="text"
          onChange={(e) => {
            setUserData((userData) => ({ ...userData, name: e.target.value }));
          }}
          value={userData.name}
        />
        <input
          type="text"
          onChange={(e) => {
            setUserData((userData) => ({ ...userData, email: e.target.value }));
          }}
          value={userData.email}
        />
        <button>AddaData</button>
      </form>

      <table>
        <tr key="">
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
        {data &&
          data?.map((item, i) => {
            console.log(item.name);

            let { name, email, id } = item;

            return (
              <tr>
                {" "}
                <td>{name}</td> <td> {email}</td>{" "}
                <td>
                  {" "}
                  <button id="edit">edit</button>{" "}
                  <button
                    id="del"
                    onClick={() => {
                      deleteDataFun(item.id);
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
      </table>
    </>
  );
};

export default Parent;
